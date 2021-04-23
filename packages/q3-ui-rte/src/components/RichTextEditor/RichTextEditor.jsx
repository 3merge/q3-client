import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Grid } from '@material-ui/core';

import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ModuleLink from '../ModuleLink';
import MediaUpload from '../MediaUpload';
import ImageOverlay from '../ImageOverlay';
import VideoIframe from '../VideoIframe';
import Toolbar from '../Toolbar';
import ToolbarMobileDrawer from '../ToolbarMobileDrawer';
import useQuill from '../useQuill';
import useStyle from '../useStyle';
import { toDataUri } from '../../adapters';
import ModuleDivider from '../ModuleDivider';

const RichTextEditor = ({
  children,
  defaultValue,
  onChange,
  upload,
  fixedOnMobile,
}) => {
  const { container, ID, TOOLBAR_ID, ref } = useQuill();
  const cls = useStyle({
    fixedOnMobile,
  });

  const mobileOptions = [
    {
      quillKey: 'list',
      value: 'unordered',
      icon: FormatListBulletedIcon,
      group: 'middle',
    },
    {
      quillKey: 'list',
      value: 'ordered',
      icon: FormatListNumberedIcon,
      group: 'middle',
    },
    { ref, component: ModuleDivider, group: 'middle' },
    {
      ref,
      component: ModuleLink,
      label: 'link',
      group: 'end',
    },
    {
      ref,
      component: MediaUpload,
      label: 'media',
      group: 'end',
      upload,
    },
    {
      ref,
      component: VideoIframe,
      label: 'video',
      group: 'end',
    },
  ];

  return (
    <Box height="100%" width="100%" ref={container}>
      <AppBar className={cls.toolbar} id={TOOLBAR_ID}>
        <Grid container justify="space-between">
          <Grid item>
            <Toolbar
              ref={container}
              options={mobileOptions}
            >
              <ToolbarMobileDrawer
                options={mobileOptions}
              />
            </Toolbar>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </AppBar>
      <Box className={cls.root}>
        <Box id={ID} height="100%" width="100%">
          <div
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{
              __html: defaultValue,
            }}
          />
        </Box>
        <ImageOverlay ref={ref} />
      </Box>
    </Box>
  );
};

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
