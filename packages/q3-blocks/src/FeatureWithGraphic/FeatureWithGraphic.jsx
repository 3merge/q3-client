import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Feature from '../Feature';

const useStyle = makeStyles(() => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    margin: 'auto',
    height: 250,
    width: 250,
    maxWidth: '100%',
    '& img, & svg': {
      height: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      width: '100%',
    },
  },
}));

const FeatureWithGraphic = ({
  graphic: Graphic,
  ...rest
}) => {
  const cls = useStyle();
  return (
    <>
      <Box className={cls.root}>
        <Graphic />
      </Box>
      <Feature {...rest} />
    </>
  );
};

FeatureWithGraphic.propTypes = {
  graphic: PropTypes.node.isRequired,
};

export default FeatureWithGraphic;
