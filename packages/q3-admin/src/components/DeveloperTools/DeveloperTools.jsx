import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import BuildIcon from '@material-ui/icons/Build';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import DropdownMenu from '../DropdownMenu';

const DeveloperTools = () => {
  const { Hide } = useAuth('developer-tools');

  return (
    <Hidden mdDown>
      <Hide op="Read">
        <DropdownMenu
          items={[
            {
              label: 'emaileditor',
              to: '/emaileditor',
            },
            {
              label: 'queues',
              to: '/queues',
            },
          ]}
        >
          {(onClick) => (
            <IconButton
              aria-label="developer tools"
              color="inherit"
              onClick={onClick}
            >
              <BuildIcon />
            </IconButton>
          )}
        </DropdownMenu>
      </Hide>
    </Hidden>
  );
};

export default React.memo(DeveloperTools);
