import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import Menu from 'q3-ui/lib/menu';
import { makePath } from './app';

const AppMenu = ({ pages }) => {
  const { t } = useTranslation();
  if (!Array.isArray(pages)) return null;

  const items = pages
    .filter((page) => page.index)
    .map((page) => ({
      ...page,
      to: makePath(page),
      visible: useAuth(page.collectionName).canSee,
      label: t(`labels:${page.resourceName}`),
      Icon: page.icon,
    }));

  items.unshift({
    to: '/',
    label: t('labels:dashboard'),
    visible: true,
  });

  return <Menu title={t('titles:3merge')} items={items} />;
};

AppMenu.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      collectionName: PropTypes.string,
      resourceName: PropTypes.string,
      icon: PropTypes.object,
    }),
  ).isRequired,
};

export default AppMenu;
