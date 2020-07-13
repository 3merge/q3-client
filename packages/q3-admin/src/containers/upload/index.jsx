import React from 'react';
import Upload from 'q3-ui/lib/upload';
import useRest from 'q3-ui-rest';
import List from 'q3-ui/lib/list';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import SidePanelContent from '../../components/SidePanelContent';
import { Definitions } from '../state';
import FileName from './FileName';
import FileManage from './FileManage';

const Files = ({ tagOptions, tagInstructions }) => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const {
    uploads = [],
    post,
    patch,
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
      <Upload fn={post} />
      {fetching && <CircularProgress />}
      {uploads.length ? (
        <List>
          {uploads.map((file) => (
            <Box
              key={file.url}
              component="li"
              mb={0.15}
              p={1}
              style={{ backgroundColor: '#FFF' }}
            >
              <FileName
                file={file}
                tagOptions={tagOptions}
                update={patch(file.id)}
                {...file}
              >
                <FileManage
                  view={file.url}
                  remove={remove(file.id)}
                />
              </FileName>
            </Box>
          ))}
        </List>
      ) : null}
      {tagInstructions}
    </SidePanelContent>
  );
};

export default Files;

/**

{/*
            <ListItem
              title={file.name}
              description={fileType(file)}
              icon={getFileIcon(fileType(file))}
            >
              <ActionBar>
                <IconButton
                  component="a"
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download file"
                >
                  <CloudDownload />
                </IconButton>
              </ActionBar>
            </ListItem> 
 */
