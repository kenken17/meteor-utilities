meteor-utilities
================

A collection of common utilities for general app development. The idea behind this package is to help reduce my daily boilerplate codes. Hope that can help yours too.

## Installation

```bash
$ meteor add kenken:meteor-utilities
```

##Utilities
Below are current available utility methods. This list will go on...

####MUtilities.readyProps($form)
Most of the time, we need to convert form inputs into javascript object literal. The `MUtilities.readyProps` could help out. By adding `data-name` data attribute to the input elements, the utility method will pick up the respected input value. Current support:

- \<input>
- \<textarea>
- \<select>
- .input (css class)

Also, if the input is `type="number"` or have a class `.number`, the object literal will use number instead of string.

*Examples:*

```html
<form id="myForm">
	<input type="text" data-name="username" value="John Doe" />
	<input type="email" data-name="email" value="jd@example.com" />
	<input type="number" data-name="age" value="30" />
	<select data-name="place">
		<option value="City A">City A</option>
		<option value="City B">City B</option>
		<option value="City C" selected>City C</option>
	</select>
	<textarea data-name="description">My description here...</textarea>
	
</form>
```

```javascript
$('#myform').on('submit', function(e) {
	var $form = $(e.currentTarget);
	
	var inputsObj = MUtilities.readyProps($form);
	/*
		Now we have: 
		
		inputsObj = {
			username: "John Doe",
			email: "jd@example.com",
			age: 30,
			place: "City C",
			description: "My description here..."
		}
	*/
});
```

The `MUtilities.readyProps` method also provides a convenient way to nest properties by using `dot` notation.

*Examples:*

```html
<form id="myTodos">
	<input type="text" data-name="todo.one" value="Todo 1" />
	<input type="text" data-name="todo.two" value="Todo 2" />
	<input type="text" data-name="todo.three" value="Todo 3" />
</form>
```

```javascript
$('#myform').on('submit', function(e) {
	var $form = $(e.currentTarget);
	
	var inputsObj = MUtilities.readyProps($form);
	/*
		Now we have: 
		
		inputsObj = {
			todo: {
				one: "Todo 1",
				two: "Todo 2",
				three: "Todo 3"
			}		
		}
	*/
});
```
---

####MUtilities.dateFormat(dateObject)
`dateFormat` will return the a naive predefined date format in `YYYY-MM-DD`. By now the format are fixed.

```javascript
var myDate = MUtilities.dateFormat(new Date());	// e.g. myDate = '2104-04-15'
```
---

####MUtilities.datetimeFormat(dateObject)
`datetimeFormat` will return the a naive predefined date & time format in `YYYY-MM-DD HH:MM (period)`. By now the format are fixed.

```javascript
var myDate = MUtilities.dateFormat(new Date());	// e.g. myDate = '2104-04-15 12:00 AM'
```
---

##UI Helpers

####{{should verb exp1 [exp2]}}
The `{{should}}` helper is to print out the `verb` given when condition is true. There is places such as output a class or a string when certain condition is true.

*Examples:*

```html
<p class="{{should 'active' true}}">This is active</p>	<!-- true condition -->
<p class="{{should 'active' 1 1}}">This is active</p>	<!-- 1 is equal to 1 -->
```

*output (html source):*

```html
<p class="active">This is active</p>
<p class="active">This is active</p>
```
---

####{{not verb exp1 [exp2]}}
The opposite of `{{should}}`, `{{not}}` will print the `verb` when the condition is false.

*Examples:*

```html
<p>{{not 'STRING HERE' false}}</p>	<!-- false condition -->
<p>{{not 'STRING HERE' 1 2}}</p>	<!-- 1 is not equal to 2 -->
```

*output: (html source)*

```
<p>STRING HERE</p>
<p>STRING HERE</p>
```

