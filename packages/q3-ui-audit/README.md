# 🔒 Q3 UI Audit

## Component

Our `<Audit />` component leverages many other Q3 packages
to dramatically reduce the amount of configurations needs to
run. Under the hood, it integrates with the Q3 REST API as
well as its permissions system so that developers need only
define a collection to run. For further examples, checkout
`q3-admin` since it uses this component inside the
`<ActivityLog />` container.

```javascript
import React from 'react';
import Audit from 'q3-ui-audit';

export default () => <Audit collectionName="testing" />;
```

## API

| Prop             | Type      | Description                                    |
| ---------------- | --------- | ---------------------------------------------- |
| `collectionName` | `String*` | The Mongo collection you'd like to audit       |
| `id`             | `String`  | The particular document ID you'd like to audit |
