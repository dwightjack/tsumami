

<!-- Start src/nodes.js -->

## Nodes 

Chainable *jQuery-like* list of nodes

#### Example:

```
import { Nodes } from 'tsumami/lib/nodes';

const els = new Nodes('.my-class');
```

#### Params:

* **`string|array|NodeList|Element`** *elements* - A CSS string, list or array of elements
* **`Element|Document`** *[ctx=document]* - Root element. Defaults to `document`

## constructor 

Constructor

## length 

The number of elements in the list

#### Example
```
import { Nodes } from 'tsumami/lib/nodes';

const els = new Nodes('.my-class');

console.log(els.length); // number...
```

#### Return:

* **`number`** 

## toArray()

Returns a shallow copy array of elements in the set

#### Example
```
import { Nodes } from 'tsumami/lib/nodes';

const els = new Nodes('.my-class');

const array = els.toArray();
```

#### Return:

* **`Array`** 

## eq(index)

Returns an element at the given index or `undefined`

#### Example
```
import { Nodes } from 'tsumami/lib/nodes';

const els = new Nodes('.my-class');

const firstElement = els.eq(0);
```

#### Params:

* **`number`** *index* - Element index

#### Return:

* **`Element`** 

## forEach(iterator)

Iterates `iterator` function on every element in the set

#### Example
```
import { Nodes } from 'tsumami/lib/nodes';
import { addClass } from 'tsumami';

const els = new Nodes('.my-class');

els.forEach((el, index) => addClass(el, `element-${index}`));
```

#### Params:

* **`function`** *iterator* - Iterator function

#### Return:

* **`Element`** 

## indexOf(target)

Returns the index of an element in the current list or `-1` if not found

#### Example
```
import { Nodes } from 'tsumami/lib/nodes';
import { qs } from 'tsumami';

const els = new Nodes('.my-class');

const firstElement = qs('.my-class');

els.indexOf(firstElement) // === 0;
```

#### Params:

* **`Element`** *target* - Target element

#### Return:

* **`number`** 

## attr(attr, [value])

Gets or sets and attribute on the set of elements

#### Example
```
import { Nodes } from 'tsumami/lib/nodes';

const els = new Nodes('.my-class');

//get the id of the first element in the set
const id = els.attr('id');

//set as string
els.attr('data-str', 'a random string');

//set as function
els.attr('data-str', (el, index) => `position-${index}`);
```

#### Params:

* **`string`** *attr* - Attribute to set
* *[value]* - Value to set. If a function, it will receive every element and its index as arguments

#### Return:

* **`Nodes`** 

## addClass(className)

Adds a class to the elements

#### Example
```
import { Nodes } from 'tsumami/lib/nodes';

const els = new Nodes('.my-class');

//set as string
els.addClass('another-class');

//set as function
els.addClass((el, index) => (index === 0 ? 'is-first' : ''));
```

#### Params:

* **`string|function`** *className* - CSS class to add or function returning the class string (signature: `(element, index) => {} `)

#### Return:

* **`Nodes`** 

## removeClass(className)

Removes a class from the elements

#### Example
```
import { Nodes } from 'tsumami/lib/nodes';

const els = new Nodes('.my-class');

//set as string
els.removeClass('another-class');

//set as function
els.removeClass((el, index) => (index === 0 ? 'is-first' : ''));
```

#### Params:

* **`string|function`** *className* - CSS class to remove or function returning the class string (signature: `(element, index) => {} `)

#### Return:

* **`Nodes`** 

## toggleClass(className, [toggle])

Toggles a class on the elements

#### Example
```
import { Nodes } from 'tsumami/lib/nodes';

const els = new Nodes('.my-class');

//set as string
els.toggleClass('is-active');

// force add
els.toggleClass('is-active', true);

// dynamic class name
els.toggleClass((el, index) => `element-${index}`);

// dynamic toggle flag
els.toggleClass('is-active', (el, index) => index === 0); //added just to the first element
```

#### Params:

* **`string|function`** *className* - CSS class to toggle or function returning the class string (signature: `(element, index) => {} `)
* **`boolean|function`** *[toggle]* - Force add or removal of the class or function returning a boolean (signature: `(element, index) => {} `)

#### Return:

* **`Nodes`** 

<!-- End src/nodes.js -->

