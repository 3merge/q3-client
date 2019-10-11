import React from 'react';
import PropTypes from 'prop-types';
import { Location, Link as ReachLink } from '@reach/router';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Home from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  capitalize: {
    textTransform: 'capitalize',
    maxWidth: 120,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 12,
  },
}));

class PathBuilder {
  constructor() {
    this.base = '';
  }

  static split(path) {
    return path.split('/').filter((x) => x);
  }

  append(path) {
    this.base += `/${path}`;
    return this.base;
  }
}

const RouterBreadcrumbs = ({ root }) => {
  const { capitalize } = useStyles();

  function renderLast(name) {
    return (
      <Typography key={name} className={capitalize}>
        {name}
      </Typography>
    );
  }

  return (
    <Location>
      {({ location }) => {
        const { pathname } = location;
        const path = new PathBuilder();
        const paths = PathBuilder.split(pathname);
        return (
          <Breadcrumbs aria-label="Navigation breadcrumbs">
            {paths.length && (
              <Link to={root} component={ReachLink}>
                <Home className={capitalize} />
              </Link>
            )}
            {paths.map((breadcrumb, i, arr) =>
              i + 1 === arr.length ? (
                renderLast(breadcrumb)
              ) : (
                <Link
                  to={path.append(breadcrumb)}
                  key={breadcrumb}
                  component={ReachLink}
                  className={capitalize}
                >
                  {breadcrumb}
                </Link>
              ),
            )}
          </Breadcrumbs>
        );
      }}
    </Location>
  );
};

RouterBreadcrumbs.propTypes = {
  root: PropTypes.string,
};

RouterBreadcrumbs.defaultProps = {
  root: '/',
};

export default RouterBreadcrumbs;
