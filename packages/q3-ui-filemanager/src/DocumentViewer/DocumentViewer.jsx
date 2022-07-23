import React from 'react';
import PropTypes from 'prop-types';
import { compact, isObject, map } from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import useStyle from './styles';
import DocumentViewerToolbar from '../DocumentViewerToolbar';
import DocumentViewerObject from '../DocumentViewerObject';
import { suppressEvent } from '../utils';

const DocumentViewer = ({ children }) => {
  const [file, setFile] = React.useState();
  const cls = useStyle({});

  const appendViewerClickToEach = (xs) =>
    map(compact(xs), (item) => ({
      ...item,
      onClick(e) {
        suppressEvent(e, () => {
          setFile(item);
        });
      },
    }));

  const handleClose = () => {
    setFile(null);
  };

  return (
    <>
      {isObject(file) && (
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
              onClose={handleClose}
            />
          </AppBar>
          <div id="previewer" className={cls.content}>
            <DocumentViewerObject {...file} />
            <div className="previewer-loader">
              <CircularProgress />
            </div>
          </div>
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
