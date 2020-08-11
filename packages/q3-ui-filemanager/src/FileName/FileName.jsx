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
} from '@material-ui/core/colors';
import useStyle from './useStyle';

export const getFileColour = (t) => {
  switch (t.toUpperCase()) {
    case 'PNG':
    case 'JPG':
    case 'JPEG':
    case 'SVG':
      return indigo[400];
    case 'PDF':
      return teal[400];
    default:
      return orange[400];
  }
};

export const renderFileIcon = (t = '') => {
  switch (t.toUpperCase()) {
    case 'PNG':
    case 'JPG':
    case 'JPEG':
    case 'SVG':
      return <Image />;
    case 'PDF':
      return <PictureAsPdf />;
    default:
      return <Description />;
  }
};

const FileName = ({ name, tag, url }) => {
  const [, ext] = name.split('.');
  const cls = useStyle();

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
      <Grid item>
        <a href={url} download className={cls.link}>
          {name}
        </a>
      </Grid>
    </Grid>
  );
};

FileName.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
};

FileName.defaultProps = {
  url: '',
};

export default FileName;
