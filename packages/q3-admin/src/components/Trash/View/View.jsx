import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Alert from 'q3-ui/lib/alert';
import Graphic from 'q3-ui-assets';
import { useTrash } from 'q3-hooked';

const View = () => {
  const {
    onClick,
    can,
    loading,
    error,
    redirecting,
  } = useTrash(2000);

  const { t } = useTranslation();

  return (
    <>
      {error && (
        <Alert
          type="error"
          label={t('descriptions:trashFail')}
          dismissable={false}
        />
      )}
      {redirecting && (
        <Alert
          type="success"
          label={t('descriptions:trashSuccess')}
          dismissable={false}
        />
      )}
      <Graphic
        description="trashDescription"
        icon="Throw"
        renderBottom={() => (
          <Box mt={2}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onClick}
                disabled={!can}
              >
                {t('labels:addToTrash')}
              </Button>
            )}
          </Box>
        )}
      />
    </>
  );
};

export default View;
