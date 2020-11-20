import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useViews } from 'q3-hooked';

const TabsWithRouter = ({ views }) => {
  const { value, links } = useViews(views);

  return (
    <Tabs value={value} variant="scrollable">
      {links.map((view) => (
        <Tab
          {...view}
          style={{
            minWidth: 'auto',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        />
      ))}
    </Tabs>
  );
};

TabsWithRouter.propTypes = {
  views: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

export default TabsWithRouter;
