# ✉️ Q3 UI Email Editor

## Component

Our `<EmailEditor />` integrates with CodeMirror JS to
deliver a text editor for MJML email templates. Since it
calls Q3 API routes for email previewing and saving, this
package has limited use for external projects.

In most cases, we'll install this package as a `q3-admin`
Addon. The example below illustrates as much.

```javascript
import React from 'react';
import Admin from 'q3-admin';
import EmailEditor from 'q3-ui-emaileditor';

export default () => (
  <Admin
    AppProps={{
      addons: [EmailEditor],
    }}
  />
);
```

## API

Currently, there are no props for this component.
