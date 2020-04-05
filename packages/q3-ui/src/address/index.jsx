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

const AddressLine = ({ children }) => (
  <Box mb={1}>
    <Grid container alignItems="flex-start">
      {children}
    </Grid>
  </Box>
);

AddressLine.propTypes = {
  children: PropTypes.node.isRequired,
};

const AddressLabel = ({ icon: Icon, label }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Grid item sm xs={12}>
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
