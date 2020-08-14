# 🗃️ Q3 UI File Manager

## Components

### Avatar

An interactive avatar component for setting and removing a
featured photo (uses a Q3 Dialog to wrap `PhotoUpload`).

```javascript
import React from 'react';
import { Avatar } from 'q3-ui-filemanager';

export default () => (
  <Avatar
    url="https://google.images.ca/1"
    onDrop={jest.fn()}
    onDelete={jest.fn()}
  />
);
```

### FileList

A file manager built with drop-zone for multi-directory file
storage. It allows users to browse files, create new folders
and upload files of all types and sizes. The file list best
suits bulk file handling needs.

```javascript
import React from 'react';
import {  FileList } from 'q3-ui-filemanager';

const data = [
	{
    name: 'filename.csv',
		url: 'https://path-to-download.com/',
	}
]

export default = () => (
	<FileList
		files={data}
		onDrop={jest.fn()}
	/>
);
```

### PhotoUpload

A featured photo manager with delete action. It will
auto-generate a preview for all uploaded files.

```javascript
import React from 'react';
import { PhotoUpload } from 'q3-ui-filemanager';

export default () => (
  <PhotoUpload
    url="https://google.images.ca/1"
    onDrop={jest.fn()}
    onDelete={jest.fn()}
  />
);
```

## API

| Prop                                | Type       | Description                                                                                               |
| ----------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| `customizer`                        | `Function` | An optional callback fuction for customizing the file name before appending to the formData instance      |
| `onDelete`                          | `Function` | Calls when a URL is provided to an existing photo                                                         |
| `onDrop`                            | `Function` | Receives FormData instance as first parameter (https://developer.mozilla.org/en-US/docs/Web/API/FormData) |
| `url` (Avatar and PhotoUpload only) | `String`   | External source for the existing photo                                                                    |
