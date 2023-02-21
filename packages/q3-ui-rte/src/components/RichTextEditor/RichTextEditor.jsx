import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box } from '@material-ui/core';
import {
  FormatListNumbered,
  FormatListBulleted,
  FormatQuote,
  Code,
} from '@material-ui/icons';
import { set, isFunction } from 'lodash';
import ImageOverlay from '../ImageOverlay';
import ModuleDivider from '../ModuleDivider';
import ModuleImage from '../ModuleImage';
import ModuleLink from '../ModuleLink';
import ModuleVideo from '../ModuleVideo';
import ModuleVideoHtml from '../ModuleVideoHtml';
import ModuleAudioHtml from '../ModuleAudioHtml';
import ModuleDocument from '../ModuleDocument';
import Toolbar from '../Toolbar';
import useLocalValue from '../useLocalValue';
import useQuill from '../useQuill';
import useStyle from '../useStyle';
import useEscape from '../useEscape';
import ModuleTable from '../ModuleTable';

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
    const keyboardUtils = useEscape();

    const { ids, ref } = useQuill(rest);
    const v = useLocalValue(ref, {
      autosave,
      autosaveInterval,
      onChange,
      defaultValue,
      id,
    });

    // ensure that external APIs can clear and get state
    set(externalRef, 'current', v);

    const mobileOptions = [
      {
        quillKey: 'list',
        value: 'unordered',
        icon: FormatListBulleted,
        group: 'middle',
      },
      {
        quillKey: 'list',
        value: 'ordered',
        icon: FormatListNumbered,
        group: 'middle',
      },
      {
        quillKey: 'code-block',
        value: 'javascript',
        group: 'middle',
        icon: Code,
      },
      {
        ref,
        component: ModuleTable,
        label: 'table',
        group: 'middle',
      },
      {
        ref,
        component: ModuleDivider,
        label: 'divider',
        group: 'middle',
      },
      {
        ref,
        component: ModuleLink,
        label: 'hyperlink',
        group: 'end',
      },
      {
        ref,
        component: ModuleVideo,
        label: 'embedVideo',
        group: 'end',
      },
      {
        quillKey: 'blockquote',
        value: 'blockquote',
        icon: FormatQuote,
        group: 'middle',
      },
    ].concat(
      isFunction(upload)
        ? [
            {
              ref,
              component: ModuleImage,
              label: 'image',
              group: 'end',
              upload,
            },
            {
              ref,
              component: ModuleVideoHtml,
              label: 'video',
              group: 'end',
              upload,
            },
            {
              ref,
              component: ModuleAudioHtml,
              label: 'audio',
              group: 'end',
              upload,
            },
            {
              ref,
              component: ModuleDocument,
              label: 'document',
              group: 'end',
              upload,
            },
          ]
        : [],
    );

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
          <Toolbar options={mobileOptions} />
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
