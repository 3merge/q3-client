import React from 'react';
import {
  withRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

const TabsWithRouter = ({ views, root, location }) => {
  const { t } = useTranslation();
  const checkLocation = React.useCallback(() => {
    const index = views.findIndex(
      ({ to }) =>
        to !== '' && location.pathname.includes(to),
    );
    return index === -1 ? 0 : index;
  }, [location.pathname, views]);

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
        <Tabs
          value={checkLocation()}
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
      </Grid>
      <Grid item style={{ flex: 1 }}>
        <Box>
          <Switch>
            {views.map(({ component: Comp, to }) => (
              <Route
                exact
                path={makePath(to)}
                component={(args) => (
                  <Fade key={to} in>
                    <div>
                      <Comp {...args} />
                    </div>
                  </Fade>
                )}
              />
            ))}
          </Switch>
        </Box>
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

export default withRouter(TabsWithRouter);
