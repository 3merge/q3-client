import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useTranslation } from 'q3-ui-locale';
import Typography from '@material-ui/core/Typography';
import ProfileGeneral from '../ProfileGeneral';
import ProfileWrapper from '../ProfileWrapper';
import ProfileNavigation from '../ProfileNavigation';

export const Profile = ({
  type,
  component,
  items: menuItems,
  ...rest
}) => {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation('titles');

  const items = [
    {
      label: 'General',
      component: ProfileGeneral,
    },
  ].concat(menuItems);

  const handleOnChange = React.useCallback(
    (e, val) => setValue(val),
    [value],
  );

  const getEl = React.useCallback(() => {
    const el = items.find((item, i) => i === value);
    return el !== undefined ? (
      React.createElement(el.component, rest)
    ) : (
      <Typography>{t('missingConfiguration')}</Typography>
    );
  }, [value, rest]);

  return component ? (
    React.createElement(component)
  ) : (
    <ProfileNavigation
      withPhoto={value === 0}
      navComponent={
        items.length > 1 ? (
          <Tabs
            onChange={handleOnChange}
            value={value}
            variant="scrollable"
          >
            {items.map((item, i) => (
              <Tab
                label={t(item.label)}
                key={i}
                value={i}
              />
            ))}
          </Tabs>
        ) : undefined
      }
    >
      {getEl()}
    </ProfileNavigation>
  );
};

Profile.propTypes = {
  component: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      component: PropTypes.func,
    }),
  ),
  type: PropTypes.oneOf(['basic', 'multipage']),
};

Profile.defaultProps = {
  component: null,
  items: [],
  type: 'basic',
};

export default (args) => (
  <ProfileWrapper>
    {(col) => <Profile {...args} {...col} />}
  </ProfileWrapper>
);
