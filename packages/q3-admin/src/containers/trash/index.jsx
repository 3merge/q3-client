import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Alert from 'q3-ui/lib/alert';
import Container from '@material-ui/core/Container';
import Graphic from 'q3-ui-assets';
import { Throw } from 'q3-ui-assets';
import { useAuth } from 'q3-ui-permissions';
import { browser } from 'q3-ui-helpers';
import connect from '../connect';

export const Trash = ({
  collectionName,
  onDelete,
  directoryPath,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [showRedirect, setShowRedirect] = React.useState(
    false,
  );

  const { t } = useTranslation();
  const { canDelete } = useAuth(collectionName);

  const navigateOnResolve = () =>
    onDelete()
      .then(() => {
        setShowRedirect(true);
        browser.redirectIn(directoryPath);
      })
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setLoading(false);
      });

  return (
    <>
      {showError && (
        <Alert
          type="error"
          label={t('descriptions:trashFail')}
          dismissable={false}
        />
      )}
      {showRedirect && (
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
                onClick={navigateOnResolve}
                disabled={!canDelete}
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

Trash.propTypes = {
  collectionName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  directoryPath: PropTypes.string.isRequired,
};

export default connect(Trash);
