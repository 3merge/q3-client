import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { browser } from 'q3-ui-helpers';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import useGlobalStyle from '../useStyle';

const AppViewport = ({ children }) => {
  const cls = useStyles();
  const globalCls = useGlobalStyle();

  React.useLayoutEffect(() => {
    if (!browser.isBrowserReady()) return undefined;

    const setViewport = () =>
      browser.setCustomCssVariable(
        '--vh',
        `${100 * (window.innerHeight / 100)}px`,
      );

    window.addEventListener('resize', setViewport);
    setViewport();

    return () => {
      window.removeEventListener('resize', setViewport);
    };
  }, []);

  return (
    <Container
      className={classnames(
        // maintain this order
        globalCls.fillViewportHeight,
        cls.container,
      )}
      component="main"
      disableGutters
      maxWidth="xl"
    >
      <Grid container>{children}</Grid>
    </Container>
  );
};

AppViewport.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default AppViewport;
