# 📤 Q3 UI Queue Logs

## Component

Our `<QueueLogs />` component provides a UI for
[Q3 API's](https://github.com/3merge/q3-api/tree/master/packages/q3-core-scheduler)
task scheduler. It allows users to view, restart and cancel
tasks, which can be helpful when troubleshoot end-client
projects.

```javascript
import React from 'react';
import Admin from 'q3-admin';
import QueueLogs from 'q3-ui-queuelogs';

export default () => (
  <Admin
    AppProps={{
      addons: [QueueLogs],
    }}
  />
);
```

## API

Currently, there are no props for this component.
