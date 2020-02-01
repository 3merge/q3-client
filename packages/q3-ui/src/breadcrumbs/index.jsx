import React from 'react';
import PropTypes from 'prop-types';
import { Location, Link as ReachLink } from '@reach/router';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Home from '@material-ui/icons/Home';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import PathBuilder from './utils';
import useStyles from './useStyle';

export const BreadcrumbTheme = ({ children, type }) => {
  const muiTheme = createMuiTheme((theme) => {
    // eslint-disable-next-line
    theme.palette.type = type;
    return theme;
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      {children}
    </MuiThemeProvider>
  );
};

BreadcrumbTheme.propTypes = {
  /**
   * Nested theme components.
   */
  children: PropTypes.node.isRequired,

  /**
   * The theme mode for MUI.
   */
  type: PropTypes.oneOf(['light', 'dark']),
};

BreadcrumbTheme.defaultProps = {
  type: 'ligth',
};

const ForwardedLink = React.forwardRef((props, ref) => (
  <ReachLink ref={ref} {...props} />
));

const LastBreadcrumb = ({ name }) => {
  const { capitalize } = useStyles();

  return (
    <Typography key={name} className={capitalize}>
      {name}
    </Typography>
  );
};

LastBreadcrumb.propTypes = {
  /**
   * The name of the active directory.
   */
  name: PropTypes.string.isRequired,
};

const BreadcrumbsHome = ({ root }) => {
  const { capitalize } = useStyles();

  return (
    <Link to={root} component={ForwardedLink}>
      <Home className={capitalize} />
    </Link>
  );
};

BreadcrumbsHome.propTypes = {
  /**
   * Defines home link path.
   */
  root: PropTypes.string.isRequired,
};

const RouterBreadcrumbs = ({ root, mode }) => {
  const { capitalize } = useStyles();

  return (
    <Location>
      {({ location }) => {
        const { pathname } = location;
        const paths = PathBuilder.split(pathname);
        const b = new PathBuilder();

        return (
          <Breadcrumbs
            style={{
              color: mode === 'dark' ? '#FFF' : 'inherit',
            }}
            aria-label="Navigation breadcrumbs"
            maxItems={3}
          >
            {paths.map((breadcrumb, i, arr) => {
              if (i === 0)
                return (
                  <BreadcrumbsHome
                    key={breadcrumb}
                    root={root}
                  />
                );

              if (i + 1 === arr.length)
                return (
                  <LastBreadcrumb
                    key={breadcrumb}
                    name={breadcrumb}
                  />
                );

              return (
                <Link
                  key={breadcrumb}
                  to={b.append(breadcrumb)}
                  className={capitalize}
                  component={ForwardedLink}
                >
                  {breadcrumb}
                </Link>
              );
            })}
          </Breadcrumbs>
        );
      }}
    </Location>
  );
};

RouterBreadcrumbs.propTypes = {
  /**
   * Root path of the app.
   */
  root: PropTypes.string,

  /**
   * Controls the color of the link items
   */
  mode: PropTypes.oneOf(['light', 'dark']),
};

RouterBreadcrumbs.defaultProps = {
  root: '/',
  mode: 'light',
};

export default RouterBreadcrumbs;
