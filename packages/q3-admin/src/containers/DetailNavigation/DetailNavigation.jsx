import React from 'react';
import { Location, Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DetailHeader from '../DetailHeader';

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

const TabsWithRouter = ({ views, ...rest }) => {
  const { t } = useTranslation();

  if (!views || views.length < 2)
    return <DetailHeader {...rest} />;

  return (
    <LocationMatch views={views} defaultIndex={0}>
      {(value) => (
        <DetailHeader
          {...rest}
          navComponent={
            <Tabs value={value} variant="scrollable">
              {views.map((view) => (
                <Tab
                  key={view.to}
                  to={`.${view.to}`}
                  label={t(`labels:${view.label}`)}
                  component={Link}
                  style={{
                    minWidth: 'auto',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                  }}
                />
              ))}
            </Tabs>
          }
        />
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
