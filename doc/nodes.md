

<!-- Start src/nodes.js -->

## Nodes 

Chainable *jQuery-like* list of nodes

#### Params:

* **`string|array|Nodes`** *elements* - A CSS string, list or array of elements
* **`Element|Node`** *[ctx=document]* - Root element. Defaults to `document`

## constructor 

Constructor

## length 

The number of elements in the list

#### Return:

* **`number`** 

## toArray()

Returns an array of elements

#### Return:

* **`Array`** 

## eq(index)

Returns an element at the given index or `undefined`

#### Params:

* **`number`** *index* - Element index

#### Return:

* **`Element`** 

## forEach(iterator)

Iterates `iterator` function on every element in the set

#### Params:

* **`function`** *iterator* - Iterator function

#### Return:

* **`Element`** 

## indexOf(target)

Returns the index of an element in the current list or `-1` if not found

#### Params:

* **`Element`** *target* - Target element

#### Return:

* **`number`** 

## attr(attr, [value])

Gets or sets and attribute on the set of elements

#### Params:

* **`string`** *attr* - Attribute to set
* *[value]* - Value to set. If a function, it will receive every element and its index as arguments

#### Return:

* **`Nodes`** 

## addClass(className)

Adds a class to the elements

#### Params:

* **`string`** *className* - CSS class to add

#### Return:

* **`Nodes`** 

## removeClass(className)

Removes a class from the elements

#### Params:

* **`string`** *className* - CSS class to add

#### Return:

* **`Nodes`** 

## toggleClass(className, [toggle])

Toggles a class on the elements

#### Params:

* **`string`** *className* - CSS class to add
* **`boolean`** *[toggle]* - Force add or removal of the class

#### Return:

* **`Nodes`** 

<!-- End src/nodes.js -->

