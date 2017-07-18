# tsumami

> ES6 DOM Utility function

## Installation

```
npm install tsumami --save

yarn add tsumami
```

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

**Modules Docs**

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
