

<!-- Start src\events.js -->

## DOM events handler

Available as a constructor (`EventManager`) and as a singleton hub (`events`)

## EventManager 

## eventsRegistry 

Event Handler Registry

#### Properties:

* **** ** 

## on(element, event, handler, [capture=false])

Adds an event handler and returns the unbind function

#### Example:

```
import { byId } from 'tsumami';
import { EventManager } from 'tsumami/lib/events';

const events = new EventManager();
const btn = byId('submit');

const unbind = events.on(btn, 'click', (e) => { ... });

//later on...

unbind();
```

#### Params:

* **`Element`** *element* - Target element
* **`string`** *event* - Event to listen for
* **`function`** *handler* - Event handler
* **`boolean`** *[capture=false]* - Whether to use event capturing

#### Return:

* **`function`** 

## off([element], [event], [handler], [capture=false])

Removes an event handler

#### Example:

```
import { byId } from 'tsumami';
import { EventManager } from 'tsumami/lib/events';

const events = new EventManager();

const btn = byId('submit');
const handler = (e) => { ... }

events.on(btn, 'click', handler);

//later on...

events.off(btn, 'click', handler);

//remove all handler for a given event
events.off(btn, 'click');

//remove all handler from an element
events.off(btn);
```

#### Params:

* **`Element`** *[element]* - Target element
* **`string`** *[event]* - Event to remove
* **`function`** *[handler]* - Event handler
* **`boolean`** *[capture=false]* - Whether to use event capturing

## delegate(element, selector, event, handler, [capture=true])

Attaches an event handler for all elements that match the selector, now or in the future, based on a specific root element.
Returns an unbind function

#### Example:

```
import { byId } from 'tsumami';
import { EventManager } from 'tsumami/lib/events';

const events = new EventManager();

const nav = byId('nav');
const handler = (e) => {
     //e.delegateTarget is the clicked element
}

const undelegate = events.delegate(nav, 'a.nav-items' 'click', handler);

//later on...

undelegate();
```

#### Params:

* **`Element`** *element* - Target element
* **`string`** *selector* - A selector to filter the elements that trigger the event
* **`string`** *event* - Event to listen for
* **`function`** *handler* - Event handler
* **`boolean`** *[capture=true]* - Whether to use event capturing

#### Return:

* **`function`** 

## undelegate(element, [selector], [event], [handler], [capture=true])

Removes an event handler for all elements that match the selector, now or in the future, based on a specific root element.

#### Example:

```
import { byId } from 'tsumami';
import { EventManager } from 'tsumami/lib/events';

const events = new EventManager();

const nav = byId('nav');
const handler = (e) => {
     //e.delegateTarget is the `nav` element
     //`this` is the clicked element
}

events.delegate(nav, 'a.nav-items' 'click', handler);

//later on...

events.undelegate(nav, 'a.nav-items' 'click', handler);
```

#### Params:

* **`Element`** *element* - Target element
* **`string`** *[selector]* - A selector to filter the elements that trigger the event
* **`string`** *[event]* - Event to listen for
* **`function`** *[handler]* - Event handler
* **`boolean`** *[capture=true]* - Whether to use event capturing

#### Return:

* **`function`** 

## destroy()

Removes all registered event handlers.

#### Example:

```
import { EventManager } from 'tsumami/lib/events';

const events = new EventManager();

//...

events.off();
```

## events 

# DOM events handler singleton

#### Example:

```
import { events } from 'tsumami/lib/events';

events.on(...)
```

<!-- End src\events.js -->

