import React from 'react';
import Box from '@material-ui/core/Box';
import Pin from '@material-ui/icons/Map';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { AddressLink, Phone, Email } from '../link';

const AddressLine = ({ children }) => (
  <Box mb={1}>
    <Grid container alignItems="flex-start">
      {children}
    </Grid>
  </Box>
);

const AddressLabel = ({ icon: Icon, label }) => (
  <Grid item>
    <Typography
      variant="overline"
      style={{
        margin: 0,
        width: 115,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Icon
        style={{
          marginRight: '0.5rem',
          fontSize: '1rem',
        }}
      />
      {label}
    </Typography>
  </Grid>
);

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
}) => (
  <Typography
    component="address"
    style={{
      fontStyle: 'normal',
      fontSize: '1rem',
    }}
  >
    <Box mb={1}>
      {label && (
        <Typography
          component="p"
          variant="h5"
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
        <strong>{company}</strong>
      </Typography>
    </Box>
    <Box mb={1}>
      <Divider />
    </Box>
    {email && (
      <AddressLine>
        <AddressLabel icon={EmailIcon} label="email" />
        <Grid item xs>
          <Email address={email} />
        </Grid>
      </AddressLine>
    )}
    {phone1 && (
      <AddressLine>
        <AddressLabel icon={PhoneIcon} label="phone" />
        <Grid item xs>
          <Phone number={phone1} />
        </Grid>
      </AddressLine>
    )}
    <AddressLine>
      <AddressLabel icon={Pin} label="address" />
      <Grid item xs>
        <AddressLink>
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
      </Grid>
    </AddressLine>
  </Typography>
);

export default Address;
