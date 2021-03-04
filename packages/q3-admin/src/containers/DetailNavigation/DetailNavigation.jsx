import React from 'react';
import { Location, Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DetailHeader from '../DetailHeader';
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

const TabsWithRouter = ({ views, ...rest }) => {
  const { t } = useTranslation();
  const cls = useStyle();

  if (!views || views.length < 2)
    return <DetailHeader {...rest} />;

  return (
    <LocationMatch views={views} defaultIndex={0}>
      {(value) => (
        <Tabs
          value={value}
          variant="scrollable"
          orientation="vertical"
          className={cls.root}
        >
          {views.map((view, i) => (
            <Fade
              in
              key={view.to}
              style={{ transitionDelay: 80 * i }}
            >
              <Tab
                to={`.${view.to}`}
                label={t(`labels:${view.label}`)}
                component={Link}
                style={{
                  textAlign: 'right',
                }}
              />
            </Fade>
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
