import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Link,
  Grid,
  Hidden,
  makeStyles,
} from '@material-ui/core';
import { Link as ReachLink } from 'gatsby';
import { useTranslation } from 'q3-ui-locale';
import { isString } from 'lodash';
import BackgroundStyle from 'q3-admin/lib/components/BackgroundStyle';
import AdminPublicGateway from './AdminPublicGateway';
import useSiteMetaData from './useSiteMetaData';

const useStyle = makeStyles((theme) => ({
  logo: ({ invertLogo = false }) => {
    const output = {
      height: 95,
      width: 180,
      display: 'block',

      '& img': {
        objectFit: 'contain',
        height: '100%',
        width: '100%',
      },
    };

    if (theme.palette.type === 'dark' && invertLogo)
      output.filter = 'invert(1) grayscale(100%)';

    return output;
  },
  container: {
    maxWidth: '85vw',
    width: 850,

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  photo: ({ photo }) => ({
    backgroundColor: theme.palette.secondary.light,
    backgroundImage: isString(photo)
      ? `url("${String(photo).replace(/\s/gi, '%20')}")`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    backgroundBlendMode: 'multiply',
    minHeight: '55vh',
  }),
}));

const Copyright = () => {
  const { brand } = useSiteMetaData();

  return brand ? (
    <Box display="inline-block" mx={1}>
      ©{new Date().getFullYear()} {brand}
    </Box>
  ) : null;
};

// eslint-disable-next-line
const TextLink = ({ href, text }) => {
  const { t } = useTranslation('labels');

  return href ? (
    <Box display="inline-block" mx={1}>
      <Link href={href} target="_blank">
        {t(text)}
      </Link>
    </Box>
  ) : null;
};

const PublicTemplate = ({ children, ...rest }) => {
  const {
    brand,
    cancellation,
    logo,
    invertLogo,
    terms,
    privacy,
    photo,
  } = useSiteMetaData();

  const cls = useStyle({
    photo,
    invertLogo,
  });

  return (
    <AdminPublicGateway {...rest}>
      <BackgroundStyle />
      <Box
        alignItems="center"
        component="article"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="100%"
      >
        <Box
          component="header"
          mt="2vh"
          mb={1}
          textAlign="center"
        >
          <ReachLink to="/" className={cls.logo}>
            <img alt={brand} src={logo} />
          </ReachLink>
        </Box>
        <Paper className={cls.container}>
          <Grid container spacing={1}>
            <Hidden smDown>
              <Grid item xs={6}>
                <Box className={cls.photo} />
              </Grid>
            </Hidden>
            <Grid item md={6} xs={12}>
              <Box
                alignItems="center"
                height="100%"
                display="flex"
                p={2}
              >
                {children}
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Box
          maxWidth="75vw"
          component="footer"
          mt={2}
          textAlign="center"
        >
          <small>
            <Copyright />
            <TextLink
              href={terms}
              text="termsAndConditions"
            />
            <TextLink href={privacy} text="privacyPolicy" />
            <TextLink
              href={cancellation}
              text="cancellationPolicy"
            />
          </small>
        </Box>
      </Box>
    </AdminPublicGateway>
  );
};

PublicTemplate.defaultProps = {
  children: null,
};

PublicTemplate.propTypes = {
  children: PropTypes.node,
};

export default PublicTemplate;
