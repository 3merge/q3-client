import React from 'react';
import { Box, Fade, makeStyles } from '@material-ui/core';
import useHeightRef from '../../hooks/useHeightRef';

const useStyle = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(1),
    },
  },
  paper: {
    height: '100%',
  },
}));

// eslint-disable-next-line
const ArticleHeightBox = ({ children }) => {
  const cls = useStyle();
  return (
    <Box ref={useHeightRef()} className={cls.root}>
      <Fade in timeout={500}>
        <Box className={cls.paper}>{children}</Box>
      </Fade>
    </Box>
  );
};

ArticleHeightBox.propTypes = {};
ArticleHeightBox.defaultProps = {};

export default ArticleHeightBox;
