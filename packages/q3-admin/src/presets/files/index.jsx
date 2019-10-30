import React from 'react';
import Upload from 'q3-ui/upload';
import List from 'q3-ui/list';
import Tile from 'q3-ui/tile';
import useRest from 'q3-ui-rest';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Image from '@material-ui/icons/Image';
import Description from '@material-ui/icons/Description';
import CloudDownload from '@material-ui/icons/CloudDownload';

const getFileIcon = (t) => {
  switch (t) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'svg':
      return Image;
    case 'pdf':
      return PictureAsPdf;
    default:
      return Description;
  }
};

const Files = ({ path }) => {
  const { uploads = [], post } = useRest({
    runOnInit: true,
    url: `${path}/uploads`,
    key: 'uploads',
  });

  return (
    <>
      <Tile title="uploadFiles" dividers={false}>
        <Upload fn={post} />
        <List
          title="He"
          items={uploads.map((file) => ({
            primary: file.name,
            secondary: file.type.toUpperCase(),
            icon: getFileIcon(file.type),
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
