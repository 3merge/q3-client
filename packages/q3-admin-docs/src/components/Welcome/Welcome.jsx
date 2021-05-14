import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Docs as DocsIcon } from 'q3-ui-assets/lib/SvgIcons';

const Docs = () => (
  <>
    <Box mb={2} maxWidth="100%" width={450}>
      <DocsIcon />
    </Box>
    <Typography variant="h1">Knowledgebase</Typography>
    <Typography variant="body2">
      Expanded documentation on your software and its
      features
    </Typography>
    <Box mt={2}>
      <Typography>
        Click on a link or search by key term to find an
        article. Content is grouped by
      </Typography>
    </Box>
  </>
);

export default Docs;
