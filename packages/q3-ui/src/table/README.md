Tabular data component with dynamic body rows and headers. The table auto-paginates if the total value exceeds the row count. Pagination will alter the ?page search parameter.

| Prop          | Description                                              | Type            | Required |
| ------------- | -------------------------------------------------------- | --------------- | -------- |
| `header`      | An array representing the table header columns           | `Array(String)` | Y        |
| `loading`     | Will show a loading indicator                            | `Boolean`       | N        |
| `error`       | Will show an error screen                                | `Boolean`       | N        |
| `rows`        | The data used to populate the table body                 | `Array(Object)` | Y        |
| `total`       | The total number of resources to represent in the footer | `Number`        | N        |
| `rowTemplate` | The React component that will render per body row        | `Node`          | Y        |
