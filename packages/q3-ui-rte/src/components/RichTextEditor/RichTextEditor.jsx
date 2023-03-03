import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box } from '@material-ui/core';
import { set } from 'lodash';
import ImageOverlay from '../ImageOverlay';
import Toolbar from '../Toolbar';
import useLocalValue from '../useLocalValue';
import useQuill from '../useQuill';
import useStyle from '../useStyle';
import useEscape from '../useEscape';

const RichTextEditor = React.forwardRef(
  (
    {
      autosave,
      autosaveInterval,
      id,
      children,
      defaultValue,
      upload,
      onChange,
      ...rest
    },
    externalRef,
  ) => {
    const cls = useStyle();
    const { ids, ref } = useQuill(rest);
    const keyboardUtils = useEscape(ref);

    const v = useLocalValue(ref, {
      autosave,
      autosaveInterval,
      onChange,
      defaultValue,
      id,
    });

    // ensure that external APIs can clear and get state
    set(externalRef, 'current', v);

    return (
      <Box
        overflow="inherit"
        height="100%"
        width="100%"
        position="relative"
        tabIndex="0"
        {...keyboardUtils}
      >
        <AppBar
          position="sticky"
          className={cls.toolbar}
          id={ids.toolbar}
          component="div"
        >
          {children}
          <Toolbar ref={ref} upload={upload} />
        </AppBar>
        <Box className={cls.root}>
          <Box id={ids.root} height="100%" width="100%">
            <div
              // eslint-disable-next-line
              dangerouslySetInnerHTML={{
                __html: v?.value,
              }}
            />
          </Box>
          <ImageOverlay ref={ref} />
        </Box>
      </Box>
    );
  },
);

RichTextEditor.propTypes = {
  children: PropTypes.node,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  upload: PropTypes.func,
  id: PropTypes.string,
  autosave: PropTypes.bool,
  autosaveInterval: PropTypes.number,
};

RichTextEditor.defaultProps = {
  children: null,
  defaultValue: '',
  onChange: undefined,
  upload: undefined,
  id: undefined,
  autosave: false,
  autosaveInterval: undefined,
};

export default RichTextEditor;
