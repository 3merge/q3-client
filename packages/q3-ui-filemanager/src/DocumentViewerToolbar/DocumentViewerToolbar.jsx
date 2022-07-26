import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PrintIcon from '@material-ui/icons/Print';
import useStyle from './styles';
import usePrint from '../usePrint';
import useSaveAs from '../useSaveAs';

const DocumentViewerToolbar = (props) => {
  const { name, onClose } = props;
  const print = usePrint();
  const save = useSaveAs(props);
  const cls = useStyle();

  const handlePrint = () =>
    print({
      printContainer: 'pg-viewer',
      scrollContainer: document
        .getElementById('previewer')
        .querySelector('.pg-viewer-wrapper'),
    });

  return (
    <Toolbar className={cls.toolbar}>
      <Box alignItems="center" display="flex">
        <IconButton
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Hidden smDown>
          <Typography
            className={cls.title}
            component="h2"
            variant="h6"
          >
            {name}
          </Typography>
        </Hidden>
      </Box>
      <Box>
        <IconButton
          aria-label="print"
          color="inherit"
          onClick={handlePrint}
        >
          <PrintIcon />
        </IconButton>

        <IconButton
          aria-label="save"
          color="inherit"
          onClick={save}
        >
          <CloudDownloadIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

DocumentViewerToolbar.defaultProps = {};

DocumentViewerToolbar.propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DocumentViewerToolbar;
