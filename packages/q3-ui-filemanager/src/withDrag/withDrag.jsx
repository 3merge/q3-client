import React from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';
import { useDrag } from 'react-dnd';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { browser } from 'q3-ui-helpers';
import FileManagerBatchContext from '../FileManagerBatchContext';
import useDragPreviewDisable from '../useDragPreviewDisable';
import useDropEnd from '../useDropEnd';

const withDrag = (Component, type = 'item') => {
  const Drag = (props) => {
    const { id } = props;
    const onDropEnd = useDropEnd();
    const [, dragRef, previewRef] = useDrag(
      () => ({
        end: onDropEnd,
        type,
        item: {
          id,
        },
      }),
      [],
    );

    const { disable, removeChecked } = React.useContext(
      FileManagerBatchContext,
    );

    useDragPreviewDisable(previewRef);

    const checkContains = (selector, target) =>
      browser.isBrowserReady()
        ? some(
            document.querySelectorAll(selector),
            (node) => node.contains(target),
          )
        : true;

    return (
      <ClickAwayListener
        onClickAway={(e) => {
          if (
            !disable &&
            !checkContains('.q3-file', e.target) &&
            !checkContains('.q3-folder', e.target)
          ) {
            console.log(id);
            removeChecked(id);
          }
        }}
      >
        <Component ref={dragRef} {...props} />
      </ClickAwayListener>
    );
  };

  Drag.propTypes = {
    id: PropTypes.string.isRequired,
  };

  return Drag;
};

export default withDrag;
