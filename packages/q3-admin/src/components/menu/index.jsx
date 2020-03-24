import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import IconMenu from 'q3-ui/lib/iconMenu';
import Menu from 'q3-ui/lib/menu';
import { makePath } from '../app';

const AppMenu = ({ pages, mobile }) => {
  const { t } = useTranslation();
  const El = mobile ? Menu : IconMenu;

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

  return <El items={items} />;
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

  mobile: PropTypes.bool,
};

AppMenu.defaultProps = {
  mobile: false,
};

export default AppMenu;
