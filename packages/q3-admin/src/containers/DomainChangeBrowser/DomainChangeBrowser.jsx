import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PhotoUpload } from 'q3-ui-filemanager';
import { useAuth } from 'q3-ui-permissions';
import SystemPageSub from '../../components/SystemPageSub';
import FeaturedPhoto from '../FeaturedPhoto';
import useDomainContext from '../../hooks/useDomainContext';

const DomainChangeBrowser = () => {
  const { HideByField } = useAuth('domain');
  const { domain = {}, update } = useDomainContext();
  const { favicon } = domain;

  return (
    <SystemPageSub title="domainBrowser">
      <HideByField path="favicon" op="Create">
        <Typography>Favicon</Typography>
        <Box width={180}>
          <FeaturedPhoto
            src={favicon}
            update={update}
            component={PhotoUpload}
            field="favicon"
          />
        </Box>
      </HideByField>
    </SystemPageSub>
  );
};

export default DomainChangeBrowser;
