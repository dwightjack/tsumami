/*! DOM Utilities - v0.1.0 - 2016-07-20
* Copyright (c) 2016 aQuest; Licensed MIT */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("desandro-classie"));
	else if(typeof define === 'function' && define.amd)
		define(["classie"], factory);
	else if(typeof exports === 'object')
		exports["ValidateForm"] = factory(require("desandro-classie"));
	else
		root["ValidateForm"] = factory(root["classie"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.toNodeList = exports.NodeList = exports.qsa = exports.qs = exports.byClassName = exports.byId = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _desandroClassie = __webpack_require__(3);

	var _desandroClassie2 = _interopRequireDefault(_desandroClassie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var camelCaseRegExp = /-([a-z])/ig;
	var toCamelCase = function toCamelCase(str) {
	    return str.replace(camelCaseRegExp, function (match) {
	        return match[1].toUpperCase();
	    });
	};

	var byId = exports.byId = function byId(id) {
	    return document.getElementById(id);
	};

	var byClassName = exports.byClassName = function byClassName(selector) {
	    var ctx = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	    return Array.toArray(ctx.getElementsByClassName(selector));
	};

	var qs = exports.qs = function qs(selector) {
	    var ctx = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	    return ctx.querySelector(selector);
	};

	var qsa = exports.qsa = function qsa(selector) {
	    var ctx = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	    return Array.from(ctx.querySelectorAll(selector));
	};

	var NodeList = function () {
	    function NodeList(elements) {
	        (0, _classCallCheck3.default)(this, NodeList);

	        this.els = typeof elements === 'string' ? qsa(elements) : Array.from(elements);
	    }

	    NodeList.prototype.toArray = function toArray() {
	        return this.els;
	    };

	    NodeList.prototype.attr = function attr(_attr, value) {
	        var els = this.els;

	        var attrStr = toCamelCase(_attr);
	        if (value) {
	            this.els.forEach(function (el) {
	                return el[attrStr] = value;
	            });
	            return this;
	        }
	        var el = els.length > 0 ? els[0] : undefined;
	        var hook = NodeList.attrHooks[attrStr];
	        if (!el) {
	            return undefined;
	        }
	        return hook ? hook(el) : el[attrStr];
	    };

	    NodeList.prototype.addClass = function addClass(className) {
	        this.els.forEach(function (el) {
	            return _desandroClassie2.default.add(el, className);
	        });
	        return this;
	    };

	    NodeList.prototype.removeClass = function removeClass(className) {
	        this.els.forEach(function (el) {
	            return _desandroClassie2.default.remove(el, className);
	        });
	        return this;
	    };

	    NodeList.prototype.toggleClass = function toggleClass(className, toggle) {
	        var fn = toggle === undefined ? 'toggle' : toggle ? 'add' : 'remove'; //eslint-disable-line no-nested-ternary
	        this.els.forEach(function (el) {
	            return _desandroClassie2.default[fn](el, className);
	        });
	        return this;
	    };

	    return NodeList;
	}();

	exports.NodeList = NodeList;


	NodeList.attrHooks = {
	    'for': function _for(el) {
	        return el.htmlFor;
	    },
	    'class': function _class(el) {
	        return el.className;
	    }
	};

	var toNodeList = exports.toNodeList = function toNodeList(elements) {
	    return new NodeList(elements);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;