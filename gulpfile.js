/*eslint-env node, mocha */
/*eslint one-var: 0, no-new: 0, func-names: 0, strict: 0 */

// Include Gulp & tools we'll use
var path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    moment = require('moment'),
    webpack = require('webpack'),
    _ = require('lodash'),
    gulpWebpack = require('webpack-stream'),
    del = require('del'),
    argv = require('yargs').argv,
    $ = require('gulp-load-plugins')(),
    pkg = require('./package.json'),
    webpackConf,
    karmaConf,
    options,
    paths,
    banner;

paths = {
    umd: 'umd/',
    dist: 'lib/'
};

options = {};

Object.keys(options).forEach(function (key) {
    if (argv.hasOwnProperty(key)) {
        options[key] = argv[key];
    }
});

webpackConf = require('./webpack.config.js')(options);

karmaConf = {
    configFile: __dirname + '/karma.conf.js',
    browsers: ['PhantomJS'],
    singleRun: false,
    autoWatch: false,
    webpack: {
        plugins: webpackConf.plugins,
        module: webpackConf.module,
        externals: webpackConf.externals,
        resolve: {
            modulesDirectories: ['node_modules']
        }
    }
};

pkg.today = moment().format('YYYY-MM-DD');
pkg.year = moment().format('YYYY');

banner = [
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ',
    '<%= pkg.today + "\\n" %>',
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>',
    '* Copyright (c) <%= pkg.year %> <%= pkg.author.name %>;',
    ' Licensed <%= pkg.license %> */<%= "\\n" %>'
].join('');


gulp.task('clean', function (done) {
    del([paths.dist, paths.umd, 'jsdoc'], {dot: true}).then(function () {
        done();
    });
});

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js'])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});


// gulp.task('jsdoc', function (done) {
//     var config = require('./jsdoc.conf.json');
//
//     gulp.src(['README.md', 'src/**/*.js', '!src/umd.js'], {read: false})
//         .pipe($.jsdoc3(config, done));
// });


gulp.task('jsdoc', function () {
    return gulp.src(['src/**/*.js', '!src/umd.js'])
        .pipe($.markdox())
        .pipe($.rename({extname: '.md'}))
        .pipe(gulp.dest('./doc'));
});




gulp.task('scripts:umd', function () {

    var umdWebpackConf = _.defaults({
        output: {
            path: path.join(__dirname, paths.umd),
            libraryTarget: 'umd',
            library: 'ValidateForm',
            filename: 'index.js'
        }
    }, webpackConf);

    return gulp.src(['src/umd.js'])
        .pipe($.plumber())
        .pipe(gulpWebpack(umdWebpackConf, webpack))
        .pipe($.header(banner, {pkg: pkg}))
        .pipe(gulp.dest(paths.umd))
        .pipe($.uglify({ preserveComments: 'license'}))
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.umd));
});

gulp.task('scripts:cjs', function () {

    return gulp.src(['src/**/*.js', '!src/umd.js'])
        .pipe($.plumber())
        .pipe($.babel())
        .pipe($.header(banner, {pkg: pkg}))
        .pipe(gulp.dest(paths.dist));
});


gulp.task('scripts', function (done) {
    var runSequence = require('run-sequence');

    runSequence('clean', ['scripts:umd', 'scripts:cjs'], done);
});


gulp.task('build', function (done) {
    var runSequence = require('run-sequence');

    runSequence('scripts', 'jsdoc', 'lint', 'test', done);
});

gulp.task('test', function (done) {

    var Server = require('karma').Server;

    var server = new Server(_.defaults({
        singleRun: true
    }, karmaConf));

    server.on('run_complete', function (browsers, results) {
        done(results.error ? 'There are test failures' : null);
    });

    server.start();

});

gulp.task('server', function () {

    var connect = require('connect'),
        http = require('http');

    var app = connect();
    app.use(require('serve-static')(__dirname));
    app.use(require('serve-index')(__dirname, {icons: true}));
    http.createServer(app).listen(3000);
    gutil.log(gutil.colors.green('Static server started at http://localhost:3000'));
});

gulp.task('bump', function () {

    return gulp.src(['package.json', 'bower.json'])
        .pipe($.bump({type: argv.type || 'patch'}))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build']);


gulp.task('serve', ['scripts', 'server'], function (done) {

    var Server = require('karma').Server;

    new Server(_.defaults({
        autoWatch: true
    }, karmaConf), done).start();

    gulp.watch(['src/**/*.js'], ['scripts:cjs', 'scripts:umd']);


});

