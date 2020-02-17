import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { orange } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import AlertIcon from '@material-ui/icons/Warning';

const FlexContainer = ({ children, shade }) => (
  <Box
    p={0.5}
    px={2}
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    style={{
      backgroundColor: shade[50],
      color: shade[900],
    }}
  >
    {children}
  </Box>
);

const UppercaseSpan = ({ children }) => (
  <Box
    component="span"
    style={{
      margin: 0,
      textTransform: 'uppercase',
      fontSize: '0.877rem',
    }}
  >
    {children}
  </Box>
);

const Persist = ({ id }) => {
  const f = useFormikContext();

  React.useEffect(() => {
    const restore = sessionStorage.getItem(id);
    const event = new CustomEvent('storage', {
      detail: {
        dirty: f.dirty,
        id,
      },
    });

    if (restore && f.status === 'Initializing') {
      f.setValues(JSON.parse(restore));
      return;
    }

    if (f.dirty) {
      sessionStorage.setItem(id, JSON.stringify(f.values));
    } else {
      sessionStorage.removeItem(id);
    }

    window.dispatchEvent(event);
  }, [f.values, f.dirty]);

  return null;
};

export const Persistence = ({ id }) => {
  const [
    hasUnsavedChanges,
    setHasUnsavedChanges,
  ] = React.useState();

  const { t } = useTranslation('labels');
  const onStorage = (e) => {
    if (e.detail.id === id)
      setHasUnsavedChanges(e.detail.dirty);
  };

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(id);
      setHasUnsavedChanges(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return hasUnsavedChanges ? (
    <FlexContainer shade={orange}>
      <UppercaseSpan>
        <AlertIcon />
        {t('unsavedChangesOn', { id })}
      </UppercaseSpan>
      <IconButton
        aria-label={t('clearChanges')}
        onClick={clearLocalStorage}
      >
        <TrashIcon />
      </IconButton>
    </FlexContainer>
  ) : null;
};

export default Persist;
