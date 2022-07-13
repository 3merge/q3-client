import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import useStyle from './styles';
import DocumentViewerToolbar from '../DocumentViewerToolbar';
import { fetchUrlAsBlob } from '../utils';

const DocumentViewer = ({ children }) => {
  const [file, setFile] = React.useState();
  const [data, setData] = React.useState(null);

  const ref = React.useRef();
  const cls = useStyle({});

  const appendViewerClickToEach = (xs) =>
    map(xs, (item) => ({
      ...item,
      onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        setFile(item);
      },
    }));

  const handleClose = () => {
    setFile(null);
    setData(null);
  };

  React.useEffect(() => {
    if (file?.url)
      fetchUrlAsBlob(file?.url)
        .then(setData)
        .catch(() => {
          // noop
        });
  }, [file]);

  return (
    <>
      {data && (
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
              {...file}
              contentRef={ref}
              onClose={handleClose}
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
      )}
      {children(appendViewerClickToEach)}
    </>
  );
};

DocumentViewer.propTypes = {
  children: PropTypes.func.isRequired,
};

export default DocumentViewer;
