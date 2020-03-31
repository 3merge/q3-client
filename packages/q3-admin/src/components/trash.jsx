import React from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { SplitPanel } from 'q3-ui/lib/panel';
import { Throw as Graphic } from 'q3-ui-assets';

const Trash = ({ onClick, url }) => {
  const { t } = useTranslation();

  const navigateOnResolve = React.useCallback(
    () =>
      onClick()
        .then(() => navigate(url))
        .catch(() => null),
    [],
  );

  return (
    <Paper elevation={0}>
      <SplitPanel
        size="xl"
        align="center"
        columnLeft={
          <Box my={2}>
            <Typography variant="overline">
              {t('titles:delete')}
            </Typography>
            <Typography variant="h3" gutterBottom>
              {t('titles:caution')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('descriptions:delete')}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={navigateOnResolve}
            >
              {t('labels:delete')}
            </Button>
          </Box>
        }
        columnRight={<Graphic />}
      />
    </Paper>
  );
};

Trash.propTypes = {
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Trash;
