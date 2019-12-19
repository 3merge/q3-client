import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import Menu from 'q3-ui/lib/menu';
import { makePath } from './app';

const AppMenu = ({ pages }) => {
  const { t } = useTranslation();

  const groupBy = pages.reduce((acc, page) => {
    if (!page.index) return acc;
    const args = {
      to: makePath(page),
      visible: useAuth(page.collectionName).canSee,
      label: t(`labels:${page.resourceName}`),
      Icon: page.icon,
    };

    if (acc[page.group]) acc[page.group].push(args);
    if (!acc[page.group]) acc[page.group] = [args];

    return acc;
  }, {});

  return Object.entries(groupBy).map(([key, value]) => (
    <Menu
      title={t(`titles:${key}`)}
      items={value}
      key={key}
    />
  ));
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
