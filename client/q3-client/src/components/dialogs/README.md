# Dialog

Modal-based views for performing creational behaviours.

## Create

| Prop       | Description                                                         | Type     | Required |
| ---------- | ------------------------------------------------------------------- | -------- | -------- |
| `next`     | The callback promise to execute once the delete action is confirmed | `Func`   | Y        |
| `redirect` | A URL path to redirect to after the callback firs                   | `String` | Y        |

## Delete

| Prop     | Description                        | Type   | Required |
| -------- | ---------------------------------- | ------ | -------- |
| `render` | Body to render inside of the modal | `Func` | Y        |
