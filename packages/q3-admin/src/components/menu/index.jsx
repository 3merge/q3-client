import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Location } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import { makePath } from '../app';
import MenuSwitcher from './switcher';

export const ActivePageDetector = (props) => (
  <Location>
    {({ location }) => {
      const activePage = get(props, 'items', []).find(
        ({ to }) => to === location.pathname,
      );

      return (
        <MenuSwitcher activePage={activePage} {...props} />
      );
    }}
  </Location>
);

const AppMenu = ({ companyName, pages }) => {
  const { t } = useTranslation();
  if (!Array.isArray(pages)) return null;

  const items = pages
    .filter((page) => page.index)
    .map((page) => ({
      ...page,
      to: makePath(page),
      visible: useAuth(page.collectionName).canSee,
      label: t(`labels:${page.resourceName}`),
      icon: page.icon,
    }));

  return (
    <ActivePageDetector title={companyName} items={items} />
  );
};

AppMenu.propTypes = {
  /**
   * List of app links to populate menu.
   */
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      collectionName: PropTypes.string,
      resourceName: PropTypes.string,
      icon: PropTypes.object,
    }),
  ).isRequired,

  /**
   * The software's identity.
   */
  companyName: PropTypes.string,
};

AppMenu.defaultProps = {
  companyName: '3merge',
};

export default AppMenu;
