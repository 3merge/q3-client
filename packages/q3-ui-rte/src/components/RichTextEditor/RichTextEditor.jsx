import React from 'react';
import { AppBar, Box, Grid } from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ModuleLink from '../ModuleLink';
import MediaUpload from '../MediaUpload';
import ImageOverlay from '../ImageOverlay';
import Toolbar from '../Toolbar';
import ToolbarMobileDrawer from '../ToolbarMobileDrawer';
import useQuill from '../useQuill';
import useStyle from '../useStyle';

const RichTextEditor = ({
  children,
  defaultValue,
  onChange,
  upload,
}) => {
  const { container, ID, TOOLBAR_ID, ref } = useQuill();
  const cls = useStyle();

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
  ];

  return (
    <Box ref={container}>
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
        <Box id={ID}>
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

export default RichTextEditor;
