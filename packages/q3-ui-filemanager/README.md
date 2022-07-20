# 🗃️ Q3 UI File Manager

## Components

### PhotoUpload

A featured photo manager with delete and download actions.

```javascript
import React from 'react';
import { PhotoUpload } from 'q3-ui-filemanager';

export default () => (
  <PhotoUpload
    collectionName="testing"
    src="https://google.images.ca/1"
    update={jest.fn()}
  />
);
```

#### API

| Prop             | Type        | Description                                                    |
| ---------------- | ----------- | -------------------------------------------------------------- |
| `collectionName` | `String*`   | Loads the appropriate permissions.                             |
| `field`          | `String`    | Changes the collection's field reference from `featuredUpload` |
| `src`            | `String`    | Fetches photo from external CDN                                |
| `update`         | `Function*` | Handles the uploading and clearing of files.                   |
