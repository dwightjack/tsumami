# tsumami

> ES6 DOM Utility function

## Installation

### as NPM package

```
npm install tsumami --save

# or

yarn add tsumami
```

### CDN delivered `<script>`

add the following script tags before your code
```html
<script src="https://unpkg.com/desandro-classie"></script> <!-- hard dependency -->
<script src="https://unpkg.com/tsumami"></script>
```

Tsumami modules will be available in the global scope as:

* `tsumami.dom`: DOM utilities [docs](doc/dom.md)
* `tsumami.EventManager`: EventManager constructor [docs](doc/events.md)
* `tsumami.events`: global EventManager instance [docs](doc/events.md#dom-events-handler-singleton)
* `tsumami.utils`: utilities [docs](doc/utils.md)
* `tsumami.Nodes`: Nodes constructor [docs](doc/nodes.md)

## Usage

Import individual functions and classes into your project
 
```js
import { byId, qsa } from 'tsumami';
import events from 'tsumami/lib/events';

//like querySelectorAll but returns an array
const articles = qsa('.c-articles'); //Array.isArray(articles) === true

const form = byId('my-form');

events.on(form, 'submit', (e) => {
    //...
});
```

## Modules Docs

* [tsumami](doc/dom.md)
* [tsumami/lib/events](doc/events.md)
* [tsumami/lib/nodes](doc/nodes.md)
* [tsumami/lib/utils](doc/utils.md)

## Contributing

1. Fork it or clone the repo
1. Install dependencies `yarn install`
1. Code your changes and write new tests in the `tests` folder.
1. Ensure everything is fine by running `yarn build`
1. Push it or submit a pull request :D
