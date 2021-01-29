# 📊 Q3 UI Charts

## Components

This package ships with a few common implementations of the
`recharts` library. It standardizes the prop API for all
visualization types, making it easy to plug-and-play with Q3
API reports.

```javascript
import React from 'react';
import { AreaLine, Bar, Line, Pie } from 'q3-ui-charts';

const data = [
  {
    'Company': 'Google',
    'Employees': 2,
  },
];

export default () => (
  <AreaLine
    title="Sample chart"
    data={data}
    name="Company"
    value="Employees"
  />
);
```

## API

| Prop    | Type     | Description                                                                                    |
| ------- | -------- | ---------------------------------------------------------------------------------------------- |
| `data`  | `Array`  | Loads into the underlying visualization component (must contain keys for the name/value props) |
| `name`  | `String` | References Y-Axis                                                                              |
| `value` | `String` | References X-Axis                                                                              |
| `title` | `String` | Renders a title for the component                                                              |
