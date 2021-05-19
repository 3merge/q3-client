import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Confirm from 'q3-ui-confirm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Graphic from 'q3-ui-assets';
import { useAuth } from 'q3-ui-permissions';
import { browser } from 'q3-ui-helpers';
import TrashIcon from '@material-ui/icons/DeleteForever';
import Dialog from 'q3-ui-dialog';
import connect from '../connect';
import useActionBar from '../../hooks/useActionBar';

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
        <Alert severity="error">
          {t('descriptions:trashFail')}
        </Alert>
      )}
      {showRedirect && (
        <Alert severity="success">
          {t('descriptions:trashSuccess')}
        </Alert>
      )}
      <Graphic
        description="trashDescription"
        icon="Throw"
        renderBottom={() => (
          <Box mt={2}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Confirm
                title="confirm"
                description="confirm"
                service={navigateOnResolve}
                disabled={!canDelete}
                label="addToTrash"
                phrase="DELETE"
              />
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

export default (props) => {
  const El = connect(Trash);

  return (
    <Dialog
      renderContent={() => <El {...props} />}
      renderTrigger={(onClick) =>
        useActionBar({
          label: 'trash',
          icon: TrashIcon,
          onClick,
        })
      }
    />
  );
};
