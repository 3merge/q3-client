Autocomplete integrates PayPal's
[Downshift](https://github.com/downshift-js/downshift) with
MD. It simulates a lazy select input, requiring a selection
but allowing dynamic search through the options.

**Note: Because this uses Formik's connect HOC, the inital
state can only be set via the initalState prop on the Formik
container.**

| Prop          | Description                                                         | Type  | Required |
| ------------- | ------------------------------------------------------------------- | ----- | -------- |
| `loadOptions` | A function returning a promise that resolves into value-label items | `Fun` | Y        |
| `inputProps`  | An object forwarded straight to Material UI's `TextField`           | `Obj` | N        |
