import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useTranslation } from 'react-i18next';
import ProfileGeneral from '../ProfileGeneral';
import ProfileWrapper from '../ProfileWrapper';
import ProfileNavigation from '../ProfileNavigation';

const Profile = ({
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
    return React.createElement(
      el !== undefined ? el.component : 'div',
      rest,
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
              <Tab label={t(item.label)} value={i} />
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
      // eslint-disable-next-line
      component: PropTypes.object,
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
