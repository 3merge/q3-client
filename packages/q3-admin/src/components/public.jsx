import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Redirect, Location } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FeaturedImage from './featuredImage';

const PublicView = ({
  companyName,
  loggedIn,
  logo,
  url,
  children,
}) => {
  const { t } = useTranslation('titles');
  if (loggedIn) return <Redirect to="/" />;

  return (
    <FeaturedImage url={url}>
      <Box width="100%">
        <Box component="header">
          <img
            src={logo}
            alt={companyName}
            style={{
              maxHeight: 35,
              marginBottom: '.5rem',
            }}
          />
        </Box>
        <Box>
          <Typography variant="h1" gutterBottom>
            <Location>
              {({ location }) =>
                t(location.pathname.substr(1))
              }
            </Location>
          </Typography>
          {children}
        </Box>
      </Box>
    </FeaturedImage>
  );
};

PublicView.propTypes = {
  companyName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logo: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PublicView;
