import React from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles';
import FileManagerBatchContext from '../FileManagerBatchContext';

const withSelected = (Component) => {
  const Selected = (props) => {
    const { id } = props;
    const { isSelected, select } = React.useContext(
      FileManagerBatchContext,
    );

    const isItemSelected = isSelected(id);
    const cls = useStyle({
      selected: isItemSelected,
    });

    return (
      <Component
        classes={cls}
        isItemSelected={isItemSelected}
        onSelect={(e) => {
          select(id, e?.shiftKey);
        }}
        {...props}
      />
    );
  };

  Selected.propTypes = {
    id: PropTypes.string.isRequired,
  };

  return Selected;
};

export default withSelected;
