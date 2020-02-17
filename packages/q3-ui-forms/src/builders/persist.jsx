import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { blue, orange } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';
import AlertIcon from '@material-ui/icons/Warning';

const FlexContainer = ({ children, shade }) => (
  <Box
    p={0.5}
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
      fontSize: '1rem',
    }}
  >
    {children}
  </Box>
);

const Persist = ({ id }) => {
  const f = useFormikContext();
  const { t } = useTranslation('labels');
  const [wasRestored, setWasRestored] = React.useState();

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(id);
      setWasRestored(false);
    }
  };

  React.useEffect(() => {
    const restore = sessionStorage.getItem(id);
    const event = new CustomEvent('storage', {
      detail: f.dirty,
    });

    if (restore && f.status === 'Initializing') {
      f.setValues(JSON.parse(restore));
      setWasRestored(true);
      return;
    }

    if (f.dirty) {
      sessionStorage.setItem(id, JSON.stringify(f.values));
    } else {
      clearLocalStorage();
    }

    window.dispatchEvent(event);
  }, [f.values, f.dirty]);

  return wasRestored ? (
    <FlexContainer shade={blue}>
      <Typography
        component="span"
        style={{ margin: 0, textTransform: 'uppercase' }}
      >
        {t('changesRestored')}
      </Typography>
      <IconButton
        aria-label={t('clearChanges')}
        onClick={() => {
          clearLocalStorage();
          f.resetForm();
        }}
      >
        <TrashIcon />
      </IconButton>
    </FlexContainer>
  ) : (
    false
  );
};

export const Persistence = ({ id }) => {
  const [
    hasUnsavedChanges,
    setHasUnsavedChanges,
  ] = React.useState();

  const { t } = useTranslation('labels');
  const onStorage = (e) => setHasUnsavedChanges(e.detail);

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
    </FlexContainer>
  ) : null;
};

export default Persist;
