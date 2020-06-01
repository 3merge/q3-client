import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { DropDownMenu } from 'q3-ui/lib/toolbar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { browser } from 'q3-ui-helpers';

function downloadURI(uri, name) {
  if (!browser.isBrowserReady()) return;

  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const FileManage = ({ remove, view }) => (
  <Box display="flex">
    <DropDownMenu
      items={[
        {
          label: 'Download',
          onClick: () => downloadURI(view),
        },
        {
          label: 'Delete',
          onClick: remove,
        },
      ]}
    >
      {(toggle) => (
        <IconButton onClick={toggle} size="small">
          <MoreVertIcon />
        </IconButton>
      )}
    </DropDownMenu>
  </Box>
);

export default FileManage;
