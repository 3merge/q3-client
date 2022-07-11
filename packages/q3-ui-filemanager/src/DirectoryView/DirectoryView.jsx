import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TableChartIcon from '@material-ui/icons/TableChart';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { browser } from 'q3-ui-helpers';
import Gallery from '../Gallery';
import List from '../List';

const DirectoryView = ({ children, defaultView }) => {
  const key = 'q3-filemanager-view';
  const [view, setView] = React.useState(
    browser.proxyLocalStorageApi('getItem', key) ||
      defaultView,
  );

  const handleViewChange = (e, newView) => {
    e.preventDefault();
    e.stopPropagation();
    browser.proxyLocalStorageApi('setItem', key, newView);
    setView(newView);
  };

  return children(
    React.useCallback(
      view === defaultView ? Gallery : List,
      [view],
    ),
    React.useCallback(
      () => (
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="directory view"
        >
          <ToggleButton
            value="gallery"
            aria-label="gallery"
          >
            <PhotoLibraryIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list">
            <TableChartIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      ),
      [view],
    ),
  );
};

DirectoryView.defaultProps = {
  defaultView: 'gallery',
};

DirectoryView.propTypes = {
  children: PropTypes.func.isRequired,
  defaultView: PropTypes.oneOf(['gallery', 'list']),
};

export default DirectoryView;
