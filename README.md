# DOM Utilities (beta release)

> DOM Utility functions

## Installation

```
npm install dom-utils
```

## Usage

Import individual functions and classes into your project
 
```js
import { byId, qsa } from 'dom-utils';
import events from 'dom-utils/lib/events';

//like querySelectorAll but returns an array
const articles = qsa('.c-articles');
//it's an array
//Array.isArray(articles) === true

const form = byId('my-form');

events.on(form, 'submit', (e) => {
    //...
});

```

**Modules Docs**

* [dom-utils](doc/dom.md)
* [dom-utils/lib/events](doc/events.md)
* [dom-utils/lib/nodes](doc/nodes.md)
* [dom-utils/lib/utils](doc/utils.md)

## Contributing

1. Fork it or clone the repo
1. Install dependencies `npm install`
1. Run `npm start` to launch a development server
1. Code your changes and write new tests in the `tests` folder.
1. Ensure everything is fine by running `npm run build`
1. Push it or submit a pull request :D
