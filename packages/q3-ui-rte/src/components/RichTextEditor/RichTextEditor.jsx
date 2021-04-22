import React from 'react';
import {
  AppBar,
  Box,
  ButtonGroup,
  IconButton,
  Grid,
  Divider,
  List,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import { useToggle } from 'useful-state';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TitleIcon from '@material-ui/icons/Title';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModuleLink from '../ModuleLink';
import MediaUpload from '../MediaUpload';
import ToolbarButton from '../ToolbarButton';
import useStyle from '../useStyle';
import useQuill from '../useQuill';
import withActiveFormatting from '../withActiveFormatting';
import ImageOverlay from '../ImageOverlay';

const RichTextEditor = ({
  children,
  defaultValue,
  onChange,
  upload,
}) => {
  const { state, toggle, close, open } = useToggle();
  const { container, ID, TOOLBAR_ID, ref } = useQuill();
  const cls = useStyle();

  const ToolbarButtonWithRef = withActiveFormatting(
    ToolbarButton,
  );

  return (
    <Box ref={container}>
      <AppBar className={cls.toolbar} id={TOOLBAR_ID}>
        <Grid container justify="space-between">
          <Grid item>
            <Grid container>
              <Grid item>
                <ButtonGroup>
                  <ToolbarButtonWithRef
                    ref={container}
                    quillKey="header"
                    value="2"
                  >
                    <TitleIcon />
                  </ToolbarButtonWithRef>
                  <ToolbarButtonWithRef
                    ref={container}
                    quillKey="bold"
                  >
                    <FormatBoldIcon />
                  </ToolbarButtonWithRef>
                  <ToolbarButtonWithRef
                    ref={container}
                    quillKey="italic"
                  >
                    <FormatItalicIcon />
                  </ToolbarButtonWithRef>
                  <ToolbarButtonWithRef
                    ref={container}
                    quillKey="underline"
                  >
                    <FormatUnderlinedIcon />
                  </ToolbarButtonWithRef>
                </ButtonGroup>
              </Grid>
              <Hidden mdDown>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ margin: '0 1rem' }}
                />
              </Hidden>
              <Hidden mdDown implementation="css">
                <Grid item>
                  <ButtonGroup>
                    <ToolbarButtonWithRef
                      ref={container}
                      quillKey="list"
                      value="ordered"
                    >
                      <FormatListNumberedIcon />
                    </ToolbarButtonWithRef>
                    <ToolbarButtonWithRef
                      ref={container}
                      quillKey="list"
                      value="unordered"
                    >
                      <FormatListBulletedIcon />
                    </ToolbarButtonWithRef>
                  </ButtonGroup>
                </Grid>
              </Hidden>
              <Hidden mdDown>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ margin: '0 1rem' }}
                />
              </Hidden>
              <Hidden mdDown>
                <Grid item>
                  <ButtonGroup>
                    <MediaUpload
                      ref={ref}
                      upload={upload}
                    />
                    <ModuleLink ref={ref} />
                  </ButtonGroup>
                </Grid>
              </Hidden>
              <Grid item>
                <Hidden mdUp implementation="css">
                  <IconButton onClick={toggle}>
                    <MoreVertIcon />
                  </IconButton>
                  <Drawer
                    anchor="bottom"
                    open={state}
                    onClose={close}
                    keepMounted
                    disablePortal
                  >
                    <List>
                      <ListItem
                        component="button"
                        button
                        className="ql-list"
                        value="unordered"
                      >
                        <ListItemIcon>
                          <FormatListNumberedIcon />
                        </ListItemIcon>
                        <ListItemText primary="ordered" />
                      </ListItem>
                      <ListItem
                        component="button"
                        button
                        className="ql-list"
                        value="unordered"
                      >
                        <ListItemIcon>
                          <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary="unordered" />
                      </ListItem>
                      <ModuleLink
                        ref={ref}
                        component={(props) => (
                          <ListItem
                            {...props}
                            component="button"
                            button
                            className="ql-list"
                            value="unordered"
                          >
                            <ListItemIcon>
                              <FormatListBulletedIcon />
                            </ListItemIcon>
                            <ListItemText primary="link" />
                          </ListItem>
                        )}
                      />

                      <MediaUpload
                        ref={ref}
                        upload={upload}
                        component={(props) => (
                          <ListItem
                            {...props}
                            component="button"
                            button
                            className="ql-list"
                            value="unordered"
                          >
                            <ListItemIcon>
                              <FormatListBulletedIcon />
                            </ListItemIcon>
                            <ListItemText primary="image" />
                          </ListItem>
                        )}
                      />
                    </List>
                  </Drawer>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </AppBar>
      <Box className={cls.root}>
        <Box id={ID}>
          <div
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
