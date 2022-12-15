import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { Box, CircularProgress } from '@material-ui/core';
import { useBrowserLayoutEffect } from 'q3-ui-helpers/lib/hooks';
import { useTranslation } from 'q3-ui-locale';
import Context from '../Context';
import useOpenCvScript from '../useOpenCvScript';

const ContextProvider = ({ children }) => {
  const [dimensions, setDimensions] = React.useState();
  const { cv, error, isReady } = useOpenCvScript();
  const { t } = useTranslation('descriptions');

  const value = React.useMemo(
    () => ({
      ...dimensions,
      cv,
    }),
    [cv, dimensions, isReady],
  );

  useBrowserLayoutEffect(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  if (error)
    return (
      <Alert serverity="error">
        {t('failedToLoadDocumentScanner')}
      </Alert>
    );

  return isReady && dimensions ? (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  ) : (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
