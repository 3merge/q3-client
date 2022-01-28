import React from 'react';
import { Fade, Box } from '@material-ui/core';
import { Detail } from 'q3-admin/lib/components';

export default ({ views, HeaderProps, ...rest }) =>
  () =>
    (
      <Fade in>
        <Box>
          <Detail {...rest} HeaderProps={HeaderProps}>
            {Object.entries(views).map(
              ([key, Component]) => (
                <Component key={key} name={key} />
              ),
            )}
          </Detail>
        </Box>
      </Fade>
    );
