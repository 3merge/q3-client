import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyle from './useStyle';
import FileExtensions from '../FileExtensions';
import FileAvatarIcon from '../FileAvatarIcon';

const FileName = ({ name, url, onClick, loading }) => {
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
        target: '_blank',
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
    <Grid
      container
      alignItems="center"
      className={cls.root}
    >
      <Grid item>
        <FileAvatarIcon loading={loading} ext={ext} />
      </Grid>
      <Grid item className={cls.truncate}>
        {renderer()}
      </Grid>
    </Grid>
  );
};

FileName.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  loading: PropTypes.bool,
};

FileName.defaultProps = {
  loading: false,
  onClick: null,
  url: '',
};

export default FileName;
