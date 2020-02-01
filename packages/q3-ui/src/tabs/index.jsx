import React from 'react';
import { Location, Link, Router } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(() => ({
  routes: {
    flex: ({ isMobile }) => (isMobile ? 'auto' : 1),
    display: ({ isMobile }) =>
      isMobile ? 'block' : 'flex',
    '& > *': {
      width: '100%',
    },
  },
  tabber: {
    maxWidth: '100%',
    maxHeight: 460,
  },
}));

export const LocationMatch = ({
  base,
  views,
  children,
  defaultIndex,
}) => {
  const checkLocation = React.useCallback((location) => {
    const index = views.findIndex(
      ({ to }) =>
        to !== '/' && location.pathname.includes(to),
    );

    if (index !== -1) return index;
    return defaultIndex;
  }, (0)[views]);

  return (
    <Location>
      {({ location }) => children(checkLocation(location))}
    </Location>
  );
};

const WrappedRoute = ({ renderer: Renderer }) => (
  <Fade in>
    <div style={{ width: '100%' }}>
      <Renderer />
    </div>
  </Fade>
);

const slug = (a, b) =>
  `${a}${b}`
    .replace(/([^:]\/)\/+/g, '$1')
    .replace(/\/$/, '');

const TabsWithRouter = ({ views, root }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:600px)');
  const { routes, tabber } = useStyles({ isMobile });

  return (
    <Grid container spacing={1}>
      <Grid item style={{ maxWidth: '100%' }}>
        <LocationMatch
          base={root}
          views={views}
          defaultIndex={0}
        >
          {(value) => (
            <Tabs
              className={tabber}
              value={value}
              scrollButtons="auto"
              variant="scrollable"
              orientation={
                isMobile ? 'horizontal' : 'vertical'
              }
            >
              {views.map((view) => (
                <Tab
                  key={`${root}${view.to}`}
                  to={slug(root, view.to)}
                  label={t(`labels:${view.label}`)}
                  component={Link}
                />
              ))}
            </Tabs>
          )}
        </LocationMatch>
      </Grid>
      <Grid item className={routes}>
        <Router primary={false}>
          {views.map(({ component: Comp, to }) => (
            <WrappedRoute
              renderer={Comp}
              path={to}
              key={to}
            />
          ))}
        </Router>
      </Grid>
    </Grid>
  );
};

TabsWithRouter.propTypes = {
  root: PropTypes.string,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

TabsWithRouter.defaultProps = {
  root: '/',
};

export default TabsWithRouter;
