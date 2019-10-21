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

const Files = ({ id }) => {
  const { files = [] } = useRest({
    url: `/files?topic=${id}`,
    key: 'files',
    runOnInit: true,
  });

  return (
    <>
      <Tile title="uploadFiles" dividers={false}>
        <Upload />
        <List
          title="He"
          items={files.map((file) => ({
            primary: file.name,
            secondary: file.type.toUpperCase(),
            icon: getFileIcon(file.type),
            render: () => (
              <IconButton>
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
