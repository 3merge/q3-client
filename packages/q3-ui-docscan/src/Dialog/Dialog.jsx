import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog as MuiDialog,
  Fab,
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useToggle } from 'useful-state';
import { useTranslation } from 'q3-ui-locale';
import StartButton from '../StartButton';
import ErrorBoundary from '../ErrorBoundary';
import useStyle from './styles';

const Dialog = ({ children }) => {
  const { state, toggle } = useToggle(false);
  const { t } = useTranslation('descriptions');
  const cls = useStyle();

  return state ? (
    <ErrorBoundary
      onError={() => {
        // eslint-disable-next-line
        alert(t('documentScannerCrashed'));
        toggle();
      }}
    >
      <MuiDialog fullScreen open>
        {children}
        <Fab
          color="primary"
          className={cls.fab}
          onClick={toggle}
          size="small"
        >
          <KeyboardBackspaceIcon />
        </Fab>
      </MuiDialog>
    </ErrorBoundary>
  ) : (
    <StartButton onClick={toggle} />
  );
};

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Dialog;
