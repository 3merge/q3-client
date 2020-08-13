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

### Browser

| Name               | Description                                                                                            | Parameters         | Return      |
| ------------------ | ------------------------------------------------------------------------------------------------------ | ------------------ | ----------- |
| `getFileThumbnail` | Takes a file and invokes the callback with either an error object or temporary URL to preview the file | `Blob`, `Function` | `Undefined` |

### String

| Name      | Description                                                                                                | Parameters | Return   |
| --------- | ---------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| `toUpper` | Abstracts the native `toUpperCase()` method but returns an empty string when provided a non-string to cast | `String`   | `String` |
