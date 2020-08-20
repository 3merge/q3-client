# 🗃️ Q3 UI Datatables

## resolvers

The `resolvers` prop is particularly powerful, as it
automates common data formatting tasks. It accepts a
`function` that should return a data schema for the `Cell`
component to interpret. The resolver calls on each row, so
be sure to account for nullish values!

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
  age: {
    renderProps: () => {
      // dynamic props to forward into the formatter
      // useful for adjusting color, language, etc.
      return {};
    },
  },
});
```

| Formatter    | Description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| `toString`   | Casts to basic string                                                                        |
| `toTruthy`   | Casts to yes/no                                                                              |
| `toDate`     | Casts to localized date string                                                               |
| `toPrice`    | Casts to common price display, rounded to 2nd decimal                                        |
| `toChip`     | Renders inside MUI Badge                                                                     |
| `toDot`      | Renders with a coloured dot indicator                                                        |
| `toAction`   | Renders an icon button that receives all other props in the data object (i.e. click handler) |
| `helperText` | Adds a popover element with supporting text                                                  |
