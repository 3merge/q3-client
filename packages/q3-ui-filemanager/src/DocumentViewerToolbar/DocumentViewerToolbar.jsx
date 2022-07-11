import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PrintIcon from '@material-ui/icons/Print';
import withFileIcon from '../withFileIcon';
import useStyle from './styles';

const DocumentViewerToolbar = ({
  contentRef,
  icon: Icon,
  iconColor,
  name,
  onClose,
  url,
}) => {
  const cls = useStyle({
    color: iconColor,
  });

  const handlePrint = () => {
    const w = window.open(
      '',
      '_blank',
      `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${window.screen.width},height=${window.screen.height}`,
    );

    let html = '<!DOCTYPE HTML>';
    html += '<html lang="en-us">';
    html += '<head><style></style></head>';
    html += '<body>';

    html += `${contentRef.current.innerHTML}<br/><br/>`;

    html += '</body>';
    w.document.write(html);
    setTimeout(() => {
      w.outerHeight = window.clientHeight;
      w.outerWidth = window.clientWidth;
      w.print();
      // w.close();
    }, 250);
  };

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
        <Icon className={cls.icon} />
        <Typography
          className={cls.title}
          component="h2"
          variant="h6"
        >
          {name}
        </Typography>
      </Box>
      <Box>
        <IconButton color="inherit" onClick={handlePrint}>
          <PrintIcon />
        </IconButton>
        <IconButton
          color="inherit"
          component="a"
          download
          href={url}
          target="_blank"
        >
          <CloudDownloadIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

PropTypes.propTypes = {
  url: PropTypes.string.isRequired,
};

export default withFileIcon(DocumentViewerToolbar);
