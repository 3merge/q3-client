import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import CloudDownload from '@material-ui/icons/CloudDownload';
import IconButton from 'q3-ui/lib/iconButton';

const ChartDownload = ({ uri }) => {
  const { t } = useTranslation('descriptions');
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = () =>
    enqueueSnackbar(t('reportStarted'), {
      variant: 'info',
    });

  const onError = () =>
    enqueueSnackbar(t('reportFailed'), {
      variant: 'error',
    });

  const handleDownload = React.useCallback(
    () => axios.post(uri).then(onSuccess).catch(onError),
    [uri],
  );

  return (
    <IconButton
      label="download"
      icon={CloudDownload}
      buttonProps={{
        onClick: handleDownload,
      }}
    />
  );
};

ChartDownload.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default ChartDownload;
