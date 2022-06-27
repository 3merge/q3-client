import React from 'react';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import { Link } from '@reach/router';
import { useTranslation } from 'q3-ui-locale';
import { Definitions } from '../../containers/state';
import useStyle from './styles';
import Back from '../../containers/back';

// eslint-disable-next-line
export const BreadcrumbLink = ({ text, to }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <MuiLink
      className={cls.font}
      color="secondary"
      component={Link}
      to={to}
      title={t(text)}
    >
      {t(text)}
    </MuiLink>
  );
};

// eslint-disable-next-line
export const BreadcrumbText = ({ text }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Typography
      className={cls.font}
      color="secondary"
      title={t(text)}
    >
      {t(text)}
    </Typography>
  );
};

const Breadcrumbs = () => {
  const {
    collectionName,
    directoryPath,
    id,
    resourceName,
  } = React.useContext(Definitions);

  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Box
      alignItems="center"
      display="flex"
      className={cls.wrapper}
    >
      <Back />
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        className={cls.root}
        separator={<span className={cls.separator}>›</span>}
      >
        <MuiLink
          className={cls.font}
          color="secondary"
          to="/"
          component={Link}
          title={t('home')}
        >
          {t('home')}
        </MuiLink>
        {id ? (
          [
            <BreadcrumbLink
              key="collection"
              text={collectionName}
              to={directoryPath}
            />,
            <BreadcrumbText
              key="detail"
              text={`${resourceName}Detail`}
            />,
          ]
        ) : (
          <BreadcrumbText text={collectionName} />
        )}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
