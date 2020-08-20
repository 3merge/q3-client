# 🗃️ Q3 UI Datatables

## resolvers

The `resolvers` prop is particularly powerful, as it
automates common data formatting tasks. It accepts a
`function` that should return a data schema for the `Cell`
component to interpret. The resolver calls on each row, so
be sure to account for nullish values!

See <a href="/src/Cell/Cell">Cell</a> for formatters.

```javascript
export const resolvers = ({
  title,
  date,
  age,
  status,
}) => ({
  photo: 'https:google.ca', // Can take override value,
  name: title, // Can take variable value,
  status: {
    base: status, // Can take base value
    toDot: true, // With a formatter
  },
  data: {
    base: status,
    toDate: true,
  },
});
```
