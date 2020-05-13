import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Pin from '@material-ui/icons/Map';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { IconLabel } from 'q3-components';
import { Inline } from 'q3-components';
import { AddressLink, Phone, Email } from '../link';
import useStyle from './useStyle';
import Map from '../map';

export const AddressLine = IconLabel;

export const AddressHeader = ({ label, title, helper }) => (
  <Box mb={1}>
    <Grid
      container
      alignItems="center"
      justify="space-between"
    >
      <Grid item>
        <Box mb={1}>
          {label && (
            <Typography
              component="p"
              variant="h6"
              color="primary"
            >
              {label}
            </Typography>
          )}
          <Typography
            color="primary"
            variant="body2"
            gutterBottom
          >
            <strong>{title}</strong>
          </Typography>
        </Box>
      </Grid>
      {helper && (
        <Grid item>
          <Inline
            title={label}
            renderContent={() => (
              <p style={{ margin: 0 }}>{helper}</p>
            )}
            renderTrigger={(open) => (
              <IconButton
                size="small"
                onClick={open}
                aria-label="Help"
              >
                <NotListedLocationIcon />
              </IconButton>
            )}
          />
        </Grid>
      )}
    </Grid>
    <Divider />
  </Box>
);

AddressHeader.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const Address = ({
  label,
  company,
  streetNumber,
  streetLine1,
  streetLine2,
  city,
  phone1,
  email,
  region,
  country,
  postal,
  helper,
}) => {
  const cls = useStyle();
  return (
    <Typography component="address" className={cls.root}>
      <AddressHeader
        label={label}
        title={company}
        helper={helper}
      />
      {email && (
        <AddressLine icon={EmailIcon} label="email">
          <Email address={email} />
        </AddressLine>
      )}
      {phone1 && (
        <AddressLine icon={PhoneIcon} label="phone">
          <Phone number={phone1} />
        </AddressLine>
      )}
      <AddressLine icon={Pin} label="address">
        <Inline
          title="GoogleMaps"
          renderContent={() => (
            <Box width="100%">
              <Map
                size="small"
                apiKey="AIzaSyCt7yombMtPIeU_-mWAi4_3iuOfh-Z_LY0"
                street={streetLine1}
                city={city}
                postal={postal}
              />
            </Box>
          )}
          renderTrigger={(open) => (
            <AddressLink
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
            >
              {streetNumber} {streetLine1}
              {streetLine2 && (
                <>
                  <br />
                  {streetLine2}
                </>
              )}
              <br />
              {city} {region}
              <br />
              {country} {postal}
            </AddressLink>
          )}
        />
      </AddressLine>
    </Typography>
  );
};

Address.propTypes = {
  label: PropTypes.string,
  company: PropTypes.string.isRequired,
  streetNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  streetLine1: PropTypes.string.isRequired,
  streetLine2: PropTypes.string,
  city: PropTypes.string.isRequired,
  phone1: PropTypes.string,
  email: PropTypes.string,
  region: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  postal: PropTypes.string.isRequired,
  helper: PropTypes.string,
};

Address.defaultProps = {
  label: '',
  streetLine2: '',
  phone1: '',
  email: '',
  helper: '',
};

export default Address;
