import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PrintIcon from '@material-ui/icons/Print';
import print from 'print-js';
import useStyle from './styles';
import useSaveAs from '../useSaveAs';

const DocumentViewerToolbar = (props) => {
  const { name, onClose } = props;
  const save = useSaveAs(props);
  const cls = useStyle();

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
        <Typography
          className={cls.title}
          component="h2"
          variant="h6"
        >
          {name}
        </Typography>
      </Box>
      <Box>
        <IconButton
          aria-label="print"
          color="inherit"
          onClick={() => {
            const el = document
              .getElementById('previewer')
              .querySelector('.pg-viewer-wrapper');

            let top = 0;

            const move = () =>
              el.scrollTo({
                behavior: 'auto',
                left: 0,
                top,
              });

            move();

            let position = null;
            const checkIfScrollIsStatic = setInterval(
              () => {
                if (
                  position >=
                  el.scrollHeight - el.clientHeight
                ) {
                  clearInterval(checkIfScrollIsStatic);
                  el.scrollTo({
                    behaviour: 'auto',
                    left: 0,
                    top: 0,
                  });

                  // now!
                  print('pg-viewer', 'html');
                  return;
                }

                position = el.scrollTop;
                top += 100;
                move();
              },
              20,
            );
          }}
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
