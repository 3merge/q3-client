import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FullScreen from '../../components/fullScreen';
import Option from '../../components/sidebar/option';

const Wrapper = ({ children }) => {
  const { t } = useTranslation();
  return (
    <FullScreen
      title="documentation"
      renderTrigger={(open) => (
        <Option
          icon={AssignmentIcon}
          title={t('titles:help')}
          description={t('labels:needHelp')}
          label={t('labels:read')}
          onClick={open}
        />
      )}
    >
      {children}
    </FullScreen>
  );
};

Wrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Wrapper;
