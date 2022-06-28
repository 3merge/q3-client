import React from 'react';
import {
  Box,
  Fade,
  Paper,
  makeStyles,
} from '@material-ui/core';
import useHeightRef from '../../hooks/useHeightRef';

const useStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
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
        <Paper className={cls.paper}>{children}</Paper>
      </Fade>
    </Box>
  );
};

ArticleHeightBox.propTypes = {};
ArticleHeightBox.defaultProps = {};

export default ArticleHeightBox;
