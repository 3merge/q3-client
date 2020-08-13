import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useStyle from './useStyle';
import FileExtensions from '../FileExtensions';

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
            color: FileExtensions.getColor(ext),
          }}
        >
          {FileExtensions.getIcon(ext)}
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
