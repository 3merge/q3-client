import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Alert from 'q3-ui/lib/alert';
import Container from '@material-ui/core/Container';
import { Throw } from 'q3-ui-assets';
import { useAuth } from 'q3-ui-permissions';
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
        setTimeout(() => navigate(directoryPath), [2000]);
      })
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setLoading(false);
      });

  return (
    <Container maxWidth="sm">
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
      <Box align="center">
        <Box maxWidth="350px" mb={2}>
          <Throw />
        </Box>
        <Typography variant="body2" gutterBottom>
          {t('descriptions:trashDescription')}
        </Typography>
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
      </Box>
    </Container>
  );
};

Trash.propTypes = {
  collectionName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  directoryPath: PropTypes.string.isRequired,
};

export default connect(Trash);
