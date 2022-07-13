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
    const { id, path } = props;
    const onDropEnd = useDropEnd();
    const [, dragRef, previewRef] = useDrag(
      () => ({
        end: onDropEnd,
        type,
        item: {
          id,
          path,
        },
      }),
      [],
    );

    const { disabled, deselect } = React.useContext(
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
            !disabled &&
            !checkContains('.q3-file', e.target) &&
            !checkContains('.q3-folder', e.target) &&
            !checkContains('.q3-context-menu', e.target)
          ) {
            deselect(id);
          }
        }}
      >
        <Component ref={dragRef} {...props} />
      </ClickAwayListener>
    );
  };

  Drag.defaultProps = {
    path: undefined,
  };

  Drag.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string,
  };

  return Drag;
};

export default withDrag;
