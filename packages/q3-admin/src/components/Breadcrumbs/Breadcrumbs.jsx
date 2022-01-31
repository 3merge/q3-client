import React from 'react';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { Link } from '@reach/router';
import { useTranslation } from 'q3-ui-locale';
import { Definitions } from '../../containers/state';
import useStyle from './styles';

const Breadcrumbs = () => {
  const {
    collectionName,
    directoryPath,
    id,
    resourceName,
  } = React.useContext(Definitions);

  const { t } = useTranslation('labels');
  const cls = useStyle();

  return id ? (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      className={cls.root}
    >
      <MuiLink color="inherit" to="/" component={Link}>
        {t('home')}
      </MuiLink>
      <MuiLink
        color="inherit"
        component={Link}
        to={directoryPath}
      >
        {t(collectionName)}
      </MuiLink>
      <Typography className={cls.font} color="textPrimary">
        {t(`${resourceName}Detail`)}
      </Typography>
    </MuiBreadcrumbs>
  ) : null;
};

export default Breadcrumbs;
