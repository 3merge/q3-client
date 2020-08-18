import React from 'react';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Image from '@material-ui/icons/Image';
import Description from '@material-ui/icons/Description';
import {
  indigo,
  teal,
  orange,
  blue,
} from '@material-ui/core/colors';
import FolderIcon from '@material-ui/icons/Folder';
import * as helpers from 'q3-ui-helpers';

const fileDefs = {
  empty: {
    color: blue[400],
    icon: <FolderIcon />,
  },
  file: {
    color: teal[400],
    icon: <PictureAsPdf />,
  },
  image: {
    color: indigo[400],
    icon: <Image />,
  },
  other: {
    color: orange[400],
    icon: <Description />,
  },
};

export default (attribute) => (value) => {
  const getFromDefs = (key) =>
    fileDefs[key] && fileDefs[key][attribute]
      ? fileDefs[key][attribute]
      : null;

  switch (helpers.string.toUpper(value)) {
    case 'PNG':
    case 'JPG':
    case 'JPEG':
    case 'SVG':
      return getFromDefs('image');
    case 'PDF':
      return getFromDefs('file');
    case '':
      return getFromDefs('empty');
    default:
      return getFromDefs('other');
  }
};
