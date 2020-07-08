import React from 'react';

const NavigationSubMenu = () => (
  <Box my={2}>
    <Divider />
    <Box py={1}>
      <Box mb={0.5}>
        <MuiLink
          fullWidth
          component={Link}
          style={{ fontSize: '0.911rem' }}
          to="/reports"
        >
          Reports
        </MuiLink>
      </Box>
      <Box mb={0.5}>
        <MuiLink
          fullWidth
          component={Link}
          style={{ fontSize: '0.911rem' }}
          to="/logs"
        >
          Logs
        </MuiLink>
      </Box>
    </Box>
  </Box>
);

export default NavigationSubMenu;
