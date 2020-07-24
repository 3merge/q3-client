import React from 'react';
import { Link } from '@reach/router';
import Graphic from 'q3-ui-assets';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import Article from '../Article';

const ViewNotAllowed = () => {
  const { t } = useTranslation('labels');
  return (
    <Article>
      <Graphic
        icon="Signal"
        title="upgradeAccount"
        renderBottom={() => (
          <Box mt={2}>
            <Button
              to="/"
              component={Link}
              variant="contained"
              color="secondary"
            >
              {t('goBack')}
            </Button>
          </Box>
        )}
      />
    </Article>
  );
};

export default React.memo(ViewNotAllowed);
