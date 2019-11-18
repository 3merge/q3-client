import Axios from 'axios';
import React from 'react';
import Upload from 'q3-ui/lib/upload';
import List from 'q3-ui/lib/list';
import Tile from 'q3-ui/lib/tile';
import useRest from 'q3-ui-rest';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Image from '@material-ui/icons/Image';
import Description from '@material-ui/icons/Description';
import CloudDownload from '@material-ui/icons/CloudDownload';

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

const Files = ({ path }) => {
  const { uploads = [], post } = useRest({
    runOnInit: true,
    url: `${path}/uploads`,
    key: 'uploads',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return (
    <>
      <Tile title="uploadFiles" dividers={false}>
        <Upload fn={post} />
        <List
          title="He"
          items={uploads.map((file) => ({
            primary: file.name,
            secondary: fileType(file),
            icon: getFileIcon(fileType(file)),

            render: () => (
              <IconButton
                component="a"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download file"
              >
                <CloudDownload />
              </IconButton>
            ),
          }))}
        />
      </Tile>
    </>
  );
};

export default Files;
