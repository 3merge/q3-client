import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Dialog from 'q3-ui-dialog';
import Pageview from '@material-ui/icons/Pageview';

//= ===============================================================================
// Partials
//= ===============================================================================

const EditDrawerOpenTrigger = ({ onClick }) => {
  const { t } = useTranslation('labels');

  return (
    <IconButton
      aria-label={t('edit')}
      onClick={onClick}
      size="small"
    >
      <Pageview />
    </IconButton>
  );
};

EditDrawerOpenTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

//= ===============================================================================
// Components
//= ===============================================================================

const EditorDrawer = ({ children, ...rest }) => (
  <Dialog
    {...rest}
    variant="drawer"
    renderContent={children}
    renderTrigger={(open) => (
      <EditDrawerOpenTrigger onClick={open} />
    )}
  />
);

EditorDrawer.propTypes = {
  children: PropTypes.func.isRequired,
};

export default EditorDrawer;
