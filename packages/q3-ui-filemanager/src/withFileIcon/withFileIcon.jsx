import React from 'react';
import PropTypes from 'prop-types';
import DescriptionIcon from '@material-ui/icons/Description';
import { useTheme } from '@material-ui/core';
import {
  purple,
  pink,
  deepPurple,
  indigo,
  cyan,
  teal,
  green,
  lime,
  orange,
  blueGrey,
  blue,
} from '@material-ui/core/colors';
import { get } from 'lodash';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import CodeIcon from '@material-ui/icons/Code';
import FolderIcon from '@material-ui/icons/Folder';
import { getFileType } from '../utils';

const colorMap = {
  JPEG: purple,
  JPG: deepPurple,
  PNG: cyan,
  GIF: teal,
  TIFF: lime,
  SVG: indigo,
  CSV: pink,
  PDF: green,
  XLSX: orange,
  FOLDER: blue,
};

const iconMap = {
  JPEG: ImageIcon,
  JPG: ImageIcon,
  PNG: ImageIcon,
  GIF: GifIcon,
  TIFF: ImageIcon,
  SVG: CodeIcon,
  MD: CodeIcon,
  HTML: CodeIcon,
  PDF: PictureAsPdfIcon,
  FOLDER: FolderIcon,
};

const withFileIcon = (Component) => {
  const FileIcon = (props) => {
    const { isFolder = false, url } = props;
    const fileType = !isFolder
      ? getFileType(url)
      : 'FOLDER';

    const theme = useTheme();
    const iconColor = React.useMemo(
      () =>
        get(
          get(colorMap, fileType, blueGrey),
          theme?.palette?.type === 'dark' ? 100 : 700,
          undefined,
        ),
      [fileType, theme],
    );

    const El = React.useMemo(
      // eslint-disable-next-line
      () => (elementProps) =>
        React.createElement(
          get(iconMap, fileType, DescriptionIcon),
          {
            style: {
              color: iconColor,
            },
            ...elementProps,
          },
        ),
      [iconColor, fileType],
    );

    return (
      <Component
        {...props}
        fileType={fileType}
        icon={El}
        iconColor={iconColor}
      />
    );
  };

  FileIcon.defaultProps = {
    isFolder: false,
  };

  FileIcon.propTypes = {
    isFolder: PropTypes.bool,
    url: PropTypes.string.isRequired,
  };

  return FileIcon;
};

export default withFileIcon;
