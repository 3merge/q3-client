import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Grid, useMediaQuery } from '@material-ui/core';
import useStyle from './styles';
import useGlobalStyle from '../useStyle';

export const ArticleAsideContext = React.createContext({
  active: null,
});

const ArticleAside = ({ children }) => {
  const { fillViewportHeight } = useGlobalStyle();
  const [state, $setState] = React.useState({
    id: null,
    content: null,
  });

  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.down('lg'),
  );

  const { root } = useStyle({
    isOpen: Boolean(state?.content),
  });

  const close = () =>
    $setState({
      id: null,
      content: null,
    });

  const setState = (xs) => {
    if (state.id === xs.id) close();
    else $setState(xs);
  };

  const value = React.useMemo(
    () => ({
      close,
      setState,
      ...state,
    }),
    [state?.id],
  );

  React.useEffect(() => {
    if (isTablet) close();
  }, [isTablet]);

  return (
    <ArticleAsideContext.Provider value={value}>
      {children}
      <Grid
        className={classnames(root, fillViewportHeight)}
        component="aside"
        item
      >
        {state?.id ? state.content : null}
      </Grid>
    </ArticleAsideContext.Provider>
  );
};

ArticleAside.defaultProps = {
  children: null,
};

ArticleAside.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default ArticleAside;
