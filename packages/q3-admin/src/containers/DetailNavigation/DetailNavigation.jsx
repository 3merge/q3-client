import React from 'react';
import { Location, Link } from '@reach/router';
import { useTranslation } from 'q3-ui-locale';
import PropTypes from 'prop-types';
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
import useStyle from './useStyle';

export const LocationMatch = ({
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

const TabsWithRouter = ({ views }) => {
  const { t } = useTranslation();
  const cls = useStyle();

  if (!views || views.length < 2) return null;

  return (
    <LocationMatch views={views} defaultIndex={0}>
      {(value) => (
        <Tabs
          value={value}
          variant="scrollable"
          className={cls.root}
        >
          {views.map((view) => (
            <Tab
              key={view.to}
              to={`.${view.to}`}
              label={t(`labels:${view.label}`)}
              className={cls.tab}
              component={Link}
            />
          ))}
        </Tabs>
      )}
    </LocationMatch>
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
