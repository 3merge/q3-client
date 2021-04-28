import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box } from '@material-ui/core';
import {
  FormatListNumbered,
  FormatListBulleted,
} from '@material-ui/icons';
import { set } from 'lodash';
import ImageOverlay from '../ImageOverlay';
import ModuleDivider from '../ModuleDivider';
import ModuleImage from '../ModuleImage';
import ModuleLink from '../ModuleLink';
import ModuleVideo from '../ModuleVideo';
import Toolbar from '../Toolbar';
import ToolbarMobileDrawer from '../ToolbarMobileDrawer';
import { toDataUri } from '../../adapters';
import useLocalValue from '../useLocalValue';
import useQuill from '../useQuill';
import useStyle from '../useStyle';

const RichTextEditor = React.forwardRef(
  (
    {
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
    const v = useLocalValue(ref, {
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
        component: ModuleImage,
        label: 'image',
        group: 'end',
        upload,
      },
      {
        ref,
        component: ModuleVideo,
        label: 'video',
        group: 'end',
      },
    ];

    return (
      <Box
        overflow="inherit"
        height="100%"
        width="100%"
        position="relative"
      >
        <AppBar
          position="sticky"
          className={cls.toolbar}
          id={ids.toolbar}
          component="div"
        >
          {children}
          <Toolbar options={mobileOptions}>
            <ToolbarMobileDrawer options={mobileOptions} />
          </Toolbar>
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
};

RichTextEditor.defaultProps = {
  children: null,
  defaultValue: '',
  onChange: undefined,
  upload: toDataUri,
};

export default RichTextEditor;
