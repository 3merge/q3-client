import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import { Button } from '@material-ui/core';
import FiltersBuilder from '../FiltersBuilder';

const BUILDER_TYPE = 'builder';
const DROPDOWN_TYPE = 'dropdown';

const FiltersLauncher = ({ contentType }) => {
  const renderTrigger = (onClick) => (
    <Button type="button" onClick={onClick}>
      Filter
    </Button>
  );

  switch (contentType) {
    case BUILDER_TYPE:
      return (
        <Dialog
          renderContent={FiltersBuilder}
          renderTrigger={renderTrigger}
          title="filterBuilder"
        />
      );
    default:
      return null;
  }
};

FiltersLauncher.propTypes = {
  contentType: PropTypes.oneOf([
    BUILDER_TYPE,
    DROPDOWN_TYPE,
  ]).isRequired,
};

export default FiltersLauncher;
