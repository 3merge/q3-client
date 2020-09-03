# 🆘 Q3 UI Helpers

A collection of type- and environment-specific helper
functions to make stabler, cleaner code.

### Usage

Each collection exports as a namespace for easy reference in
your project. See the method tables below for further usage
instructions.

```javascript
import {
  array,
  browser,
  object,
  props,
  string,
  url,
} from 'q3-ui-helpers';
```

### Array

| Name        | Description                                                                         | Parameters | Return    |
| ----------- | ----------------------------------------------------------------------------------- | ---------- | --------- |
| `hasLength` | Takes a parameter and determines if its (a) an array and (b) has at least one index | `Any`      | `Boolean` |

### Browser

| Name               | Description                                                                                            | Parameters         | Return      |
| ------------------ | ------------------------------------------------------------------------------------------------------ | ------------------ | ----------- |
| `getFileThumbnail` | Takes a file and invokes the callback with either an error object or temporary URL to preview the file | `Blob`, `Function` | `Undefined` |

### Object

| Name             | Description                                                                                            | Parameters                    | Return |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------- | ------ |
| `invokeSafely`   | Takes a function and fowards all parameters into it if it is in fact a function                        | `Function`, [`Any`]           | `Any*` |
| `invokeInSafely` | Takes an object and a targetted method then fowards all parameters into it if it is in fact a function | `Function`, `String`, [`Any`] | `Any*` |

#### Examples

```javascript
import { object } from 'q3-ui-helpers';

const fn = (num) => 1 * num;
const target = { fn };

object.invokeSafely(null, 10); // returns undefined
object.invokeSafely(fn, 10); // returns 10

object.invokeInSafely(null, undefined, 10); // returns undefined
object.invokeInSafely(target, 'fn', 10); // returns 10
```

### String

| Name      | Description                                                                                                | Parameters | Return   |
| --------- | ---------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| `toUpper` | Abstracts the native `toUpperCase()` method but returns an empty string when provided a non-string to cast | `String`   | `String` |
