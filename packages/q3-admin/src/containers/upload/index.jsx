import React from 'react';
import Upload from 'q3-ui/lib/upload';
import useRest from 'q3-ui-rest';
import List from 'q3-ui/lib/list';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { FileList } from 'q3-ui-filemanager';
import SidePanelContent from '../../components/SidePanelContent';
import { Definitions } from '../state';
import FileName from './FileName';
import FileManage from './FileManage';

const Files = () => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const {
    uploads = [],
    post,

    remove,
    fetching,
  } = useRest({
    runOnInit: true,
    url: `/${collectionName}/${id}/uploads`,
    key: 'uploads',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return (
    <SidePanelContent title="fileManager">
      <FileList files={uploads} onDrop={post} />
    </SidePanelContent>
  );
};

export default Files;
