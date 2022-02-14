import React from 'react';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';
import Upload from '../Upload';

const ModuleVideoHtml = React.forwardRef((props, ref) => (
  <Upload
    {...props}
    accept={[
      'text/csv',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/gzip',
      'image/gif',
      'text/html',
      'text/calendar',
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/svg+xml',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip',
    ]}
    blot="document"
    maxSize="40mb"
    onSuccess={(url, file, index) => {
      ref.current.insertText(index, file.name, 'link', url);
    }}
    ref={ref}
    updateSelection={false}
  />
));

ModuleVideoHtml.propTypes = propTypes;

export default withCurrentSelection(ModuleVideoHtml, {
  icon: NoteAddIcon,
  label: 'document',
});
