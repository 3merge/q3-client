# 🗃️ Q3 UI File Manager

## FileList

A file manager built with drop-zone for multi-directory file
storage. It allows users to browse files, create new folders
and upload files of all types and sizes. The file list best
suits bulk file handling needs.

### API

| Prop     | Type       | Description                                                                       |
| -------- | ---------- | --------------------------------------------------------------------------------- |
| `onDrop` | `Function` | Receives FormData instance as first parameter, which contains all uploading files |
| `files`  | `Array`    | Organizes existing files by shared directory                                      |

### Example

```javascript
import React from 'react';
import {  FileList } from 'q3-ui-filemanager';

const data = [
	{
    // Will render icon based on file extension
    name: 'filename.csv',
		url: 'https://path-to-download.com/',
	}
]

const Example = () => (
	const handleApiService = (formData) => {
		// Attaches all uploaded files to a FormData instance
		// See: https://developer.mozilla.org/en-US/docs/Web/API/FormData
	};

	return <FileList files={data} onDrop={handleApiService} />;
);

export default Example;
```

## PhotoUpload

A featured photo manager with delete action. It will
auto-generate a preview for all uploaded files.

### API

| Prop       | Type       | Description                                                                       |
| ---------- | ---------- | --------------------------------------------------------------------------------- |
| `onDelete` | `Function` | Calls when a URL is provided to an existing photo                                 |
| `onDrop`   | `Function` | Receives FormData instance as first parameter, which contains all uploading files |
| `url`      | `String`   | External source for the existing photo                                            |

### Example

```javascript
import React from 'react';
import {  PhotoUpload } from 'q3-ui-filemanager';

const Example = () => (
	const onDelete = () => {
		// Do something to remove external file from API
	};

	const handleApiService = (formData) => {
		// Attaches all uploaded files to a FormData instance
		// See: https://developer.mozilla.org/en-US/docs/Web/API/FormData
	};

	return <FileList url="https://google.images.ca/1" onDelete={onDelete} onDrop={handleApiService} />;
);

export default Example;
```
