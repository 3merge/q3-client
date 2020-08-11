import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Image from '@material-ui/icons/Image';
import Description from '@material-ui/icons/Description';
import Grid from '@material-ui/core/Grid';
import {
  indigo,
  teal,
  orange,
  blue,
} from '@material-ui/core/colors';
import FolderIcon from '@material-ui/icons/Folder';
import useStyle from './useStyle';

const getFileColour = (t) => {
  switch (t ? t.toUpperCase() : '') {
    case 'PNG':
    case 'JPG':
    case 'JPEG':
    case 'SVG':
      return indigo[400];
    case 'PDF':
      return teal[400];
    case '':
      return blue[400];
    default:
      return orange[400];
  }
};

const renderFileIcon = (t = '') => {
  switch (t ? t.toUpperCase() : '') {
    case 'PNG':
    case 'JPG':
    case 'JPEG':
    case 'SVG':
      return <Image />;
    case 'PDF':
      return <PictureAsPdf />;
    case '':
      return <FolderIcon />;
    default:
      return <Description />;
  }
};

const FileName = ({ name, url, onClick }) => {
  const [, ext] = name.split('.');
  const cls = useStyle();

  const make = (el, args = {}) =>
    React.createElement(
      el,
      {
        className: cls.link,
        ...args,
      },
      name,
    );

  const renderer = () => {
    if (url)
      return make('a', {
        download: true,
        href: url,
      });

    if (onClick)
      return make('button', {
        type: 'button',
        onClick,
      });

    return make('span');
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          style={{
            backgroundColor: 'transparent',
            color: getFileColour(ext),
          }}
        >
          {renderFileIcon(ext)}
        </Avatar>
      </Grid>
      <Grid item>{renderer()}</Grid>
    </Grid>
  );
};

FileName.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
};

FileName.defaultProps = {
  onClick: null,
  url: '',
};

export default FileName;
