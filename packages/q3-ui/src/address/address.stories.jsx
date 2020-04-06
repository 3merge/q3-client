import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AccountBox from '@material-ui/icons/AccountBox';
import Address, { AddressLine, AddressHeader } from '.';
import fixture from './__fixtures__';

export default {
  title: 'Q3 UI/Components/Address',
};

export const SampleWithPhone = () => (
  <Address {...fixture} />
);

export const JustTheHeader = () => (
  <AddressHeader title="Just the title" label="Label" />
);

export const JustTheLine = () => (
  <AddressLine label="Label" icon={AccountBox}>
    This is line
  </AddressLine>
);

export const SideBySide = () => (
  <Box p={8} style={{ backgroundColor: '#FFF' }}>
    <Grid container spacing={4}>
      <Grid item>
        <Address
          label="Bill-to"
          company="TD Bank"
          streetNumber="15"
          streetLine1="York streeet"
          city="Toronto"
          region="ON"
          postal="M5J 0A3"
          phone1="416-789-1234"
          country="CA"
          email="sample@address.com"
        />
      </Grid>
      <Grid item>
        <Address
          label="Ship-to"
          company="Googleplex Head Office"
          streetNumber="1600"
          streetLine1="Amphitheatre Pkwy"
          streetLine2="Unit #42"
          city="Mountain View"
          region="CA"
          country="US"
          postal="94043"
          phone1="416-789-1234"
          email="sample@address.com"
        />
      </Grid>
    </Grid>
  </Box>
);
