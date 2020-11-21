import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import { useViews } from 'q3-hooked';
import { array } from 'q3-ui-helpers';

const withRouterLinks = (Component, tabProps = {}) => {
  const Renderer = ({ views }) => {
    const { value, links } = useViews(views);
    const hasMoreThanOneTab = array.is(links).length > 1;

    return hasMoreThanOneTab ? (
      <Component value={value}>
        {links.map((view) => (
          <Tab key={view.label} {...view} {...tabProps} />
        ))}
      </Component>
    ) : null;
  };

  Renderer.defaultProps = {
    views: [],
  };

  Renderer.propTypes = {
    views: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
      }),
    ),
  };

  return Renderer;
};

export default withRouterLinks;
