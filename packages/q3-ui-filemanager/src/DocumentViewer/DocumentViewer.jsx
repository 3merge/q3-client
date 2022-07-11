import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import useStyle from './styles';
import DocumentViewerToolbar from '../DocumentViewerToolbar';
import { fetchUrlAsBlob } from '../utils';

const DocumentViewer = (props) => {
  const { name, url } = props;
  const [data, setData] = React.useState(null);
  const ref = React.useRef();
  const cls = useStyle({});

  React.useEffect(() => {
    if (url)
      fetchUrlAsBlob(url)
        .then(setData)
        .catch(() => {
          // noop
        });
  }, [url]);

  return data ? (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
        },
      }}
      fullScreen
      open
    >
      <Box className={cls.backdrop} />
      <AppBar className={cls.appbar} color="inherit">
        <DocumentViewerToolbar
          {...props}
          contentRef={ref}
          onClose={() => {
            setData(null);
          }}
        />
      </AppBar>
      <Box ref={ref} className={cls.content}>
        <object
          aria-label="doc viewer"
          data={data}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </Box>
    </Dialog>
  ) : null;
};

PropTypes.propTypes = {
  url: PropTypes.string.isRequired,
};

export default DocumentViewer;
