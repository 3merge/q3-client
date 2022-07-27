import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import TableChartIcon from '@material-ui/icons/TableChart';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { browser } from 'q3-ui-helpers';
import Gallery from '../Gallery';
import List from '../List';
import {
  getKey,
  getFromLocalStorage,
  suppressEvent,
} from '../utils';

const DirectoryView = ({ children, defaultView }) => {
  const suffix = 'view';
  const [view, setView] = React.useState(
    getFromLocalStorage(suffix, defaultView),
  );

  const isGallery = view === 'gallery';

  const handleViewChange = (e) =>
    suppressEvent(e, () => {
      const newView = isGallery ? 'list' : 'gallery';
      browser.proxyLocalStorageApi(
        'setItem',
        getKey(suffix),
        newView,
      );

      setView(newView);
    });

  return children(
    React.useCallback(isGallery ? Gallery : List, [view]),
    React.useCallback(
      () => (
        <IconButton
          aria-label="view"
          color="inherit"
          onClick={handleViewChange}
        >
          {isGallery ? (
            <TableChartIcon />
          ) : (
            <PhotoLibraryIcon />
          )}
        </IconButton>
      ),
      [view],
    ),
  );
};

DirectoryView.defaultProps = {
  defaultView: 'list',
};

DirectoryView.propTypes = {
  children: PropTypes.func.isRequired,
  defaultView: PropTypes.oneOf(['gallery', 'list']),
};

export default DirectoryView;
