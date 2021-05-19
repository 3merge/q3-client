import React from 'react';
import { FileList } from 'q3-ui-filemanager';
import useRest from 'q3-ui-rest';
import CircularProgress from '@material-ui/core/CircularProgress';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Dialog from 'q3-ui-dialog';
import { Definitions } from '../state';
import useActionBar from '../../hooks/useActionBar';

const Upload = () => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const { uploads = [], post, remove, fetching } = useRest({
    runOnInit: true,
    url: `/${collectionName}/${id}/uploads`,
    key: 'uploads',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return !fetching ? (
    <FileList
      collectionName={collectionName}
      files={uploads}
      onDelete={remove}
      onDrop={post}
    />
  ) : (
    <CircularProgress />
  );
};

export default () => (
  <Dialog
    title="files"
    variant="drawer"
    renderContent={() => <Upload />}
    renderTrigger={(onClick) =>
      useActionBar({
        sort: 1,
        label: 'files',
        icon: AttachFileIcon,
        onClick,
      })
    }
  />
);
