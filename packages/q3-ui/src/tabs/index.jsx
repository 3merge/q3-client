import React from 'react';
import { Location, Link, Router } from '@reach/router';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';

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

const Nav = (props) => React.createElement('nav', props);
const Article = (props) =>
  React.createElement('article', props);

const TabsWithRouter = ({
  views,
  root,
  wrap,
  wrapBody,
  dense,
  ...rest
}) => {
  const { t } = useTranslation();
  const Wrapper = wrap || Nav;
  const WrapperBody = wrapBody || Article;

  return (
    <Box>
      <LocationMatch
        base={root}
        views={views}
        defaultIndex={0}
      >
        {(value) => (
          <Wrapper>
            <Tabs
              value={value}
              variant="scrollable"
              {...rest}
            >
              {views.map((view) => (
                <Tab
                  key={`${root}${view.to}`}
                  to={slug(root, view.to)}
                  label={t(`labels:${view.label}`)}
                  style={
                    dense
                      ? {
                          minWidth: 'auto',
                          paddingLeft: '1.5rem',
                          paddingRight: '1.5rem',
                        }
                      : {}
                  }
                  component={Link}
                />
              ))}
            </Tabs>
          </Wrapper>
        )}
      </LocationMatch>
      <WrapperBody>
        <Router primary={false}>
          {views.map(({ component: Comp, to }) => (
            <WrappedRoute
              renderer={Comp}
              path={to}
              key={to}
            />
          ))}
        </Router>
      </WrapperBody>
    </Box>
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
