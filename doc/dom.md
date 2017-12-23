

<!-- Start src\dom.js -->

# DOM Utility Functions

## byId(id)

Returns a reference to the element by its ID.

#### Example:

```
import { byId } from 'tsumami';

const content = byId('main-content');
```

See: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById

#### Params:

* **`string`** *id* - ID string

#### Return:

* **`Element`** 

## byClassName(className, [ctx=document])

Returns an array of all child elements which have all of the given class names

#### Example:

```
import { byClassName } from 'tsumami';

const listItems = byClassName('list__items');
```

#### Params:

* **`string`** *className* - class string to search for
* **`Element|Document`** *[ctx=document]* - Root element. `document` by default

#### Return:

* **`Array`** 

## qs(selector, [ctx=document])

Returns the first element within the document that matches the specified group of selectors

#### Example:

```
import { qs } from 'tsumami';

const content = qs('#main-content');
```

See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

#### Params:

* **`string`** *selector* - CSS selector
* **`Element|Document`** *[ctx=document]* - Root element. `document` by default

#### Return:

* **`Element`** 

## qsa(selector, [ctx=document])

Returns a list of the elements within the document that match the specified group of selectors

#### Example:

```
import { qsa } from 'tsumami';

const listItems = qsa('.list .list-items');
```

See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

#### Params:

* **`string`** *selector* - One or more CSS selectors separated by commas.
* **`Element|Document`** *[ctx=document]* - Root element. `document` by default

#### Return:

* **`Array`** 

## data(element, [attr])

Returns a parsed data attribute from the passed-in node. If not found returns `null`

#### Example:

```
import { byId, data } from 'tsumami';

//html: <div id="content" data-name="my-content" data-idx="1" data-bool="false"></div>

const content = byId('content');

const name = attr(content, 'name'); // "my-content"
const idx = attr(content, 'idx'); // 1
const bool = attr(content, 'bool'); // false
```

#### Params:

* **`Element`** *element* - DOM Element
* **`string`** *[attr]* - Data attribute to retrieve (without the `data-`). If empty will return an object with every `data-` attribute as key.

#### Return:

* 

## toArray(element)

Converts passed-in Element or NodeList to an array.

#### Example:

```
import { toArray } from 'tsumami';

const content = document.getElementById('content');
const arrayLike = document.querySelectorAll('.elements');

const elements = toArray(arrayLike);
// Array.isArray(elements) === true

const contentArray = toArray(content);
// Array.isArray(contentArray) === true
```

#### Params:

* **`array|Element|NodeList`** *element* - Value to convert

#### Return:

* **`array`** 

Returns `true` if the `element` would be selected by the specified `selector` string; otherwise, returns false.

#### Example:

```
import { matches, qs } from 'tsumami';

const el = qs('.parent .child');

if (matches(el, '.parent')) {
  // false
}

if (matches(el, '.parent .child')) {
  // true
}
```

#### Params:

* **`Element`** *element* 
* **`string`** *selector* 

#### Return:

* **`boolean`** 

## parents(element, [selector])

Gets the ancestors of an element, optionally filtered by a selector.

#### Example:

```
import { parents, qs } from 'tsumami';

const listItem = qs('li.list-item');

const parentsEls = parents(listItem);

const parentLists = parents(listItem, 'ul');
```

#### Params:

* **`Element`** *element* - Source element
* **`string`** *[selector]* - A string containing a selector expression to match elements against.

#### Return:

* **`Array`** 

## closest(element, selector)

Gets the first element that matches `selector` by testing the element itself and traversing up through its ancestors in the DOM tree.

Will use native [`Element.prototype.closest`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) if available.

#### Example:

```
import { closest, qs } from 'tsumami';

const listItem = qs('li.list-item');

const list = closest(listItem, 'ul');
```

#### Params:

* **`Element`** *element* - Source element
* **`string`** *selector* - A string containing a CSS selector expression to match

#### Return:

* 

## addClass(element, className)

Adds a new class to the element

#### Example

```
import { addClass, byId } from 'tsumami';

const content = byId('content');

addClass(content, 'new-class');
```

#### Params:

* **`Element`** *element* - Target element
* **`string`** *className* - Class to add

## removeClass(element, className)

Removes a new class to the element

#### Example

```
import { removeClass, byId } from 'tsumami';

const content = byId('content');

removeClass(content, 'remove-me');
```

#### Params:

* **`Element`** *element* - Target element
* **`string`** *className* - Class to remove

## hasClass(element, className)

Checks if an element as a given class

#### Example

```
import { hasClass, byId } from 'tsumami';

const content = byId('content');

if (hasClass(content, 'remove-me')) {
    //...
}
```

#### Params:

* **`Element`** *element* - Target element
* **`string`** *className* - Class to check

## toggleClass(element, className, [toggle])

If class exists then removes it, if not, then adds it.
When the second argument is present and is true, add specified class value, if is false removes it.

#### Example

```
import { toggleClass, byId } from 'tsumami';

// html: <div id="content"></div>
const content = byId('content');

toggleClass(content, 'random-class')
// html: <div id="content" class="random-class"></div>

toggleClass(content, 'random-class')
// html: <div id="content"></div>

toggleClass(content, 'random-class')
// html: <div id="content" class="random-class"></div>

toggleClass(content, 'random-class', true)
// html: <div id="content" class="random-class"></div>
```

#### Params:

* **`Element`** *element* - Target element
* **`string`** *className* - Class to toggle
* **`boolean`** *[toggle]* - Force add or removal of the class

<!-- End src\dom.js -->

