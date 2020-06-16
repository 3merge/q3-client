import React from 'react';
import PropTypes from 'prop-types';
import { Location, Link as ReachLink } from '@reach/router';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Home from '@material-ui/icons/Home';
import PathBuilder from './utils';
import useStyles from './useStyle';

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

const RouterBreadcrumbs = ({ root, mode, locale }) => {
  const { capitalize, contrast } = useStyles();

  return (
    <Location>
      {({ location }) => {
        const { pathname } = location;
        const paths = PathBuilder.split(pathname);
        const b = new PathBuilder(locale);

        return (
          <Breadcrumbs
            className={mode === 'dark' ? contrast : null}
            aria-label="Navigation breadcrumbs"
            maxItems={4}
          >
            <BreadcrumbsHome root={root} />
            {paths.map((breadcrumb, i, arr) => {
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
   * A lang prefix for each path part.
   */
  locale: PropTypes.string,

  /**
   * Controls the color of the link items
   */
  mode: PropTypes.oneOf(['light', 'dark']),
};

RouterBreadcrumbs.defaultProps = {
  root: '/',
  mode: 'light',
  locale: 'en-CA',
};

export default RouterBreadcrumbs;
