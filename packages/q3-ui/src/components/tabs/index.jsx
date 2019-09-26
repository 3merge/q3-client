import React from 'react';
import { Location, Link, Router } from '@reach/router';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

export const LocationMatch = ({
  base,
  views,
  children,
}) => {
  const checkLocation = React.useCallback(
    (location) => {
      const index = views.findIndex(
        ({ to }) =>
          to !== '' && location.pathname.includes(to),
      );
      if (index !== -1) return index;
      if (location.pathname === base) return 0;
      return false;
    },
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

  return (
    <Grid container spacing={5}>
      <Grid item>
        <LocationMatch base={root} views={views}>
          {(value) => (
            <Tabs
              value={value}
              orientation="vertical"
              variant="scrollable"
            >
              {views.map((view) => (
                <Tab
                  key={view.to || view.label}
                  to={view.to || root}
                  label={t(`labels:${view.label}`)}
                  component={Link}
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
