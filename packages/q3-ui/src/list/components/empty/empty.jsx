import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Empty as EmptySvg } from 'q3-ui-assets';
import ErrorComponent from '../../../error';

const Empty = ({ onClick }) => {
  const { t } = useTranslation('labels');

  return (
    <Box component="li" my={2}>
      <Box mt={5}>
        <ErrorComponent
          transparent
          title="empty"
          description="empty"
        >
          <EmptySvg />
        </ErrorComponent>
        <Box textAlign="center" my={-2} mb={4}>
          {onClick && (
            <Button
              onClick={onClick}
              variant="contained"
              color="primary"
              size="large"
            >
              {t('addFirst')}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

Empty.propTypes = {
  onClick: PropTypes.func,
};

Empty.defaultProps = {
  onClick: null,
};

export default Empty;
