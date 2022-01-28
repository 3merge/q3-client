import React from 'react';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { Link } from '@reach/router';
import { useTranslation } from 'q3-ui-locale';
import HomeIcon from '@material-ui/icons/Home';
import { Definitions } from '../../containers/state';

const Breadcrumbs = () => {
  const {
    collectionName,
    directoryPath,
    id,
    resourceName,
  } = React.useContext(Definitions);

  const { t } = useTranslation('labels');

  return id ? (
    <MuiBreadcrumbs aria-label="breadcrumb">
      <MuiLink
        aria-label={t('home')}
        color="inherit"
        to="/"
        component={Link}
      >
        <HomeIcon />
      </MuiLink>
      <MuiLink
        color="inherit"
        component={Link}
        to={directoryPath}
      >
        {t(collectionName)}
      </MuiLink>
      <Typography color="textPrimary">
        {t(`${resourceName}Detail`)}
      </Typography>
    </MuiBreadcrumbs>
  ) : null;
};

export default Breadcrumbs;
