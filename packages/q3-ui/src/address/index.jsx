import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Pin from '@material-ui/icons/Map';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { AddressLink, Phone, Email } from '../link';
import useStyle from './useStyle';

export const AddressLabel = ({ icon: Icon, label }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Grid item>
      <Typography variant="overline" className={cls.label}>
        <Icon className={cls.icon} />
        {t(label)}
      </Typography>
    </Grid>
  );
};

AddressLabel.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export const AddressLine = ({ children, ...rest }) => (
  <Box mb={0.25}>
    <Grid container alignItems="flex-start">
      <AddressLabel {...rest} />
      <Grid item xs>
        {children}
      </Grid>
    </Grid>
  </Box>
);

AddressLine.propTypes = {
  ...AddressLabel.propTypes,
  children: PropTypes.node.isRequired,
};

export const AddressHeader = ({ label, title }) => (
  <Box mb={1}>
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
}) => {
  const cls = useStyle();
  return (
    <Typography component="address" className={cls.root}>
      <AddressHeader label={label} title={company} />
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
};

Address.defaultProps = {
  label: '',
  streetLine2: '',
  phone1: '',
  email: '',
};

export default Address;
