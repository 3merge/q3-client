import React from 'react';
import PropTypes from 'prop-types';
import { Menu, IconButton } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { array } from 'q3-ui-helpers';
import { useOpen } from 'useful-state';
import DownloadMenuItem from '../DownloadMenuItem';
import useSaveAs from '../useSaveAs';

const Download = ({ data, title }) => {
  const { isOpen, anchorEl, close, open } = useOpen();
  const { csv, xlsx } = useSaveAs(title, data);

  return (
    <>
      <IconButton
        color="primary"
        disabled={!array.hasLength(data)}
        onClick={open}
      >
        <CloudDownloadIcon />
      </IconButton>
      <Menu
        id="chart-download-options"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
      >
        <DownloadMenuItem label="csv" onClick={csv} />
        <DownloadMenuItem label="excel" onClick={xlsx} />
      </Menu>
    </>
  );
};

Download.defaultProps = {
  data: [],
  title: 'export',
};

Download.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default Download;
