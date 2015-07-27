meteor-utilities
================

A collection of common utilities for general app development. The idea behind this package is to help reduce my daily boilerplate codes. Hope that can help yours too.

## Installation

```bash
$ meteor add kenken:meteor-utilities
```

##Utilities
Below are current available utility methods. This list will go on...

####MUtilities.readyProps($form, [skipEmpty]) - *client only*
Most of the time, we need to convert form inputs into javascript object literal. The `MUtilities.readyProps` could help out. By adding `data-name` data attribute to the input elements, the utility method will pick up the respected input value. Current support:

- \<input>
- \<textarea>
- \<select>
- .input (css class)
- .boolean (css class)

Also, if the input is `type="number"` or have a class `.number`, the object literal will use number instead of string.

If the input have class `.boolean`, the object literal will use either `true` or `false` instead of string. E.g. `true (string)` will yield `true (boolean)`, else will result `false (boolean)`. If the input is `type=cehckbox` or `type=radio` and is `checked`, will result `true (boolean)` else `false (boolean)`.

For `skipEmpty` option, if the input is an empty string. It will still skip through the property.

*Examples:*

```html
<form id="myForm">
	<input type="text" data-name="username" value="John Doe" />
	<input type="email" data-name="email" value="jd@example.com" />
	<input type="number" data-name="age" value="30" />
	<input type="checkbox" class="boolean" data-name="working" value="yes" />
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
			working: true,
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

####MUtilities.isValidWebUrl(testUrl) - *client only*
`isValidWebUrl` will return true is the input `testUrl` is a valid web url. The testing regular expression was taken from a [gist](https://gist.github.com/dperini/729294) by Diego Perini.

*Examples:*

```javascript
var var1 = MUtilities.isValidWebUrl('http://www.github.com');	// true
var var2 = MUtilities.isValidWebUrl('I am not a url.');	// false
```
---

####MUtilities.setCookie(id, value, [[expiry], [path]]) - *client only*
`setCookie` will set the `value` to the `id` (name), for an `expiry` in milliseconds. If `expiry` is omitted, default to `1 day`. `path` is set default to `'/'` 

*Examples:*

```javascript
MUtilities.setCookie('cookieName', 'cookieValue', 2 * 60 * 60 * 1000, '/');	// set cookie for 2 hours on path '/'
```
---

####MUtilities.getCookie(id) - *client only*
`getCookie` will return the cookie value set by `setCookie`.

*Examples:*

```javascript
MUtilities.setCookie('cookieName', 'cookieValue');

var cookie = MUtilities.getCookie('cookieName');	// cookie = 'cookieValue'
```
---

####MUtilities.removeCookie(id, [path]) - *client only*
`removeCookie` will remove the cookie with the `id` pass as the first argument. If `path` is omitted, `'/'` will be used.

*Examples:*

```javascript
MUtilities.setCookie('cookieName', 'cookieValue');
MUtilities.removeCookie('cookieName');

var cookie = MUtilities.getCookie('cookieName');	// cookie = null
```
---

####MUtilities.dateFormat(dateObject)
`dateFormat` will return the a naive predefined date format in `YYYY-MM-DD`. By now the format are fixed.

*Examples:*

```javascript
var myDate = MUtilities.dateFormat(new Date());	// e.g. myDate = '2104-04-15'
```
---

####MUtilities.datetimeFormat(dateObject)
`datetimeFormat` will return the a naive predefined date & time format in `YYYY-MM-DD HH:MM (period)`. By now the format are fixed.

*Examples:*

```javascript
var myDate = MUtilities.datetimeFormat(new Date());	// e.g. myDate = '2104-04-15 12:00 AM'
```
---

####MUtilities.currencyFormat(value, [[prefix], [decimal], [skipZero]])
`currencyFormat` will return a simple currency format for the input value, default to be 2 decimal point and no prefix. If skipZero is `true`, when value is zero/null, it will return empty string.

*Examples:*

```javascript
var myMoney = MUtilities. currencyFormat(23);	// e.g. myMoney = '23.00'
var myMoney = MUtilities. currencyFormat(23, '$');	// e.g. myMoney = '$23.00'
var myMoney = MUtilities. currencyFormat(23, '$', 4);	// e.g. myMoney = '$23.0000'
var myMoney = MUtilities. currencyFormat(0, '$', 2, true);	// e.g. myMoney = ''
```
---

####MUtilities.highlighter(str, keys, [skipIgnore])
`highlighter` will return the original string with a span wrapped any matched `keys`. `keys` could be a string or an array of strings. Default matching epxression is to ignore case-sensitive. If need to obey cases, pass in `true` for the third paramater - `skipIgnore`.

*Examples:*

```javascript
var newString = MUtilities. highlighter('This is a string', 'string');
// e.g. newString = 'This is a <span class="highlight">string</span>'

var newString = MUtilities. highlighter('This is a string', ['is', 'string']);
// e.g. newString = 'This <span class="highlight">is</span> a <span class="highlight">string</span>'
```

Note: in order to use the output from `highlighter` in template, use `{{{` & `}}}`, i.e. tripple curly braces.

---

##UI Helpers

####{{should verb exp1 [exp2]}}
The `{{should}}` helper is to print out the `verb` given when condition is true. There are places such as output a class or a string when certain condition is true.

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

####{{shouldIn verb exp1 exp2}}
The `{{shouldIn}}` helper is similar to `{{should}}`, except that it checks `exp2` is in the `exp1` array. It will print out the `verb` given when condition is true. 

*Note that `exp2` is required.*

*Examples:*

```html
<!-- roles = ['admin'] -->
<p>{{shouldIn 'I am admin' roles 'admin}}</p>	<!-- true condition -->
```

*output (html source):*

```html
<p>I am admin</p>
```
---

####{{notIn verb exp1 exp2}}
The opposite of `{{shouldIn}}`, `{{notIn}}` will print the `verb` when the condition is false.

*Examples:*

```html
<!-- roles = ['admin'] -->
<p>{{notIn 'I am stranger' roles 'stranger'}}</p>	<!-- false condition -->
```

*output: (html source)*

```
<p>I am stranger</p>
```
---

####{{dateFormat dateObject}}
Same utility method for `MUtilities.dateFormat()`.

*Examples:*

```html
{{#with myPost}}
	<!-- which myPost has createdAt property is date object-->
	<p>{{dateFormat createdAt}}</p>	
{{/with}}
```

*output: (html source)*

```
<p>2015-04-26</p>
```
---

####{{datetimeFormat dateObject}}
Same utility method for `MUtilities.datetimeFormat()`.

*Examples:*

```html
{{#with myPost}}
	<!-- which myPost has createdAt property is date object-->
	<p>{{datetimeFormat createdAt}}</p>	
{{/with}}
```

*output: (html source)*

```
<p>2015-04-26 09:20 AM</p>
```
---

####{{currencyFormat value prefix decimal}}
Same utility method for `MUtilities.currencyFormat()`.

*Examples:*

```html
<p>{{currencyFormat 23 '$' 4}}</p>	
```

*output: (html source)*

```
<p>$23.0000</p>
```
