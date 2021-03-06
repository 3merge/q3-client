import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { array } from 'q3-ui-helpers';
import { useOpen } from 'useful-state';
import DownloadMenuItem from '../DownloadMenuItem';
import useSaveAs from '../useSaveAs';

const Download = ({ children, data, title }) => {
  const { isOpen, anchorEl, close, open } = useOpen();
  const { csv, xlsx } = useSaveAs(title, data);
  const disabled = !array.hasLength(data);

  return (
    <>
      <Button
        color="inherit"
        disabled={disabled}
        onClick={open}
        size="large"
      >
        <CloudDownloadIcon
          style={{ marginRight: '.5rem' }}
        />
        {children}
      </Button>
      {!disabled && (
        <Menu
          id="chart-download-options"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={close}
          keepMounted
        >
          <DownloadMenuItem label="csv" onClick={csv} />
          <DownloadMenuItem label="excel" onClick={xlsx} />
        </Menu>
      )}
    </>
  );
};

Download.defaultProps = {
  data: [],
  title: 'export',
  children: null,
};

Download.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default Download;
