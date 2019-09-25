import React from 'react';
import { Location, Link, Router } from '@reach/router';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

export const LocationMatch = ({ views, children }) => {
  const checkLocation = React.useCallback(
    (location) =>
      views.findIndex(
        ({ to }) =>
          to !== '' && location.pathname.includes(to),
      ),
    [views],
  );

  return (
    <Location>
      {({ location }) => children(checkLocation(location))}
    </Location>
  );
};

const WrappedRoute = ({ renderer: Renderer }) => (
  <Fade in>
    <div>
      <Renderer />
    </div>
  </Fade>
);

const TabsWithRouter = ({ views, root }) => {
  const { t } = useTranslation();
  const makePath = React.useCallback(
    (val) => {
      if (!val) {
        return root;
      }
      return `${root}${
        root.substr(-1) === '/' ? '' : '/'
      }${val}`;
    },
    [root],
  );

  return (
    <Grid container spacing={5}>
      <Grid item>
        <LocationMatch views={views}>
          {(value) => (
            <Tabs
              value={value}
              orientation="vertical"
              variant="scrollable"
            >
              {views.map((view) => (
                <Tab
                  key={view.href}
                  label={t(`labels:${view.label}`)}
                  component={Link}
                  to={makePath(view.to)}
                />
              ))}
            </Tabs>
          )}
        </LocationMatch>
      </Grid>
      <Grid item style={{ flex: 1 }}>
        <Router>
          {views.map(({ component: Comp, to }) => (
            <WrappedRoute
              default={!to}
              path={makePath(to)}
              key={to}
              renderer={Comp}
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
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

TabsWithRouter.defaultProps = {
  root: '/',
};

export default TabsWithRouter;
