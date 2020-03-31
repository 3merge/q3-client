import React from 'react';
import Upload from 'q3-ui/lib/upload';
import useRest from 'q3-ui-rest';
import List, { ActionBar, ListItem } from 'q3-ui/lib/list';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Image from '@material-ui/icons/Image';
import Description from '@material-ui/icons/Description';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { Definitions } from '../state';

const getFileIcon = (t) => {
  switch (t) {
    case 'PNG':
    case 'JPG':
    case 'JPEG':
    case 'SVG':
      return Image;
    case 'PDF':
      return PictureAsPdf;
    default:
      return Description;
  }
};

const fileType = (file) =>
  file.name
    .toUpperCase()
    .split('.')
    .pop();

const Files = () => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const { uploads = [], post, fetching } = useRest({
    runOnInit: true,
    url: `/${collectionName}/${id}/uploads`,
    key: 'uploads',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return (
    <>
      <Upload fn={post} />
      {fetching && <CircularProgress />}
      {uploads.length ? (
        <List>
          {uploads.map((file) => (
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
          ))}
        </List>
      ) : null}
    </>
  );
};

export default Files;
