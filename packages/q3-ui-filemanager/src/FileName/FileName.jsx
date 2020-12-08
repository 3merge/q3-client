import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useStyle from './useStyle';
import FileAvatarIcon from '../FileAvatarIcon';
import { getUrlOrOnClickProps } from '../utils';

const FileName = ({
  name,
  url,
  onClick,
  loading,
  ...rest
}) => {
  const [, ext] = name.split('.');
  const cls = useStyle();

  return (
    <Grid
      container
      alignItems="center"
      className={cls.root}
      {...rest}
    >
      <Grid item>
        <FileAvatarIcon loading={loading} ext={ext} />
      </Grid>
      <Grid item className={cls.truncate}>
        <Box
          {...getUrlOrOnClickProps(url, onClick)}
          className={cls.link}
        >
          {name}
        </Box>
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
