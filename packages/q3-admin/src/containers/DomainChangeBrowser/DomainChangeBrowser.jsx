import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PhotoUpload } from 'q3-ui-filemanager';
import SystemPageSub from '../../components/SystemPageSub';
import FeaturedPhoto from '../FeaturedPhoto';
import useDomainContext from '../../hooks/useDomainContext';

const DomainChangeBrowser = () => {
  const { domain = {}, update } = useDomainContext();
  const { favicon } = domain;

  return (
    <SystemPageSub title="domainBrowser">
      <Typography>Favicon</Typography>
      <Box width={180}>
        <FeaturedPhoto
          src={favicon}
          update={update}
          component={PhotoUpload}
          field="favicon"
        />
      </Box>
    </SystemPageSub>
  );
};

export default DomainChangeBrowser;
