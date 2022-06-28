import React from 'react';
import { Location, Link } from '@reach/router';
import { useTranslation } from 'q3-ui-locale';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core';
import useStyle from './useStyle';

const StyledTab = withStyles((theme) => ({
  textColorInherit: {
    fontWeight: 'bold',
    minHeight: 'auto',
    minWidth: 'auto',
    opacity: 0.5,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
}))(Tab);

const StyledTabs = withStyles((theme) => ({
  indicator: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',

    '& > span': {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 5,
      display: 'block',
      boxShadow: theme.shadows[2],
      height: 2.5,
      maxWidth: 31.5,
      width: '100%',
    },
  },
  root: {
    minHeight: 'auto',
  },
}))((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span />,
      style: {
        height: 3,
      },
    }}
  />
));

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
        <StyledTabs
          value={value}
          variant="scrollable"
          className={cls.root}
        >
          {views.map((view) => (
            <StyledTab
              key={view.to}
              to={`.${view.to}`}
              label={t(`labels:${view.label}`)}
              className={cls.tab}
              component={Link}
            />
          ))}
        </StyledTabs>
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
