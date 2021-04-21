import React from 'react';
import {
  Paper,
  Box,
  ButtonGroup,
  Grid,
} from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import ModuleLink from '../ModuleLink';
import MediaUpload from '../MediaUpload';
import ToolbarButton from '../ToolbarButton';
import ToolbarDropdownMenu from '../ToolbarDropdownMenu';
import useStyle from '../useStyle';
import useQuill from '../useQuill';
import withActiveFormatting from '../withActiveFormatting';
import ImageOverlay from '../ImageOverlay';

const RichTextEditor = ({
  defaultValue,
  onChange,
  upload,
}) => {
  const { container, ID, TOOLBAR_ID, ref } = useQuill();

  const [fullscreen, setFullscreen] = React.useState(false);
  const cls = useStyle({
    fullscreen,
  });

  const ToolbarDropdownMenuWithRef = withActiveFormatting(
    ToolbarDropdownMenu,
  );

  const ToolbarButtonWithRef = withActiveFormatting(
    ToolbarButton,
  );

  return (
    <Paper
      ref={container}
      className={cls.paper}
      variant="outlined"
      square
    >
      <Paper className={cls.toolbar} id={TOOLBAR_ID}>
        <Grid container justify="space-between">
          <Grid item>
            <Grid container>
              <Grid item>
                <ToolbarDropdownMenuWithRef
                  ref={container}
                  label="heading"
                  options={[
                    {
                      label: 'huge',
                      quillClassKey: 'header',
                      quillClassValue: '2',
                    },
                    {
                      label: 'large',
                      quillClassKey: 'header',
                      quillClassValue: '3',
                    },
                    {
                      label: 'medium',
                      quillClassKey: 'header',
                      quillClassValue: '4',
                    },
                    {
                      label: 'normal',
                      quillClassKey: 'header',
                      quillClassValue: undefined,
                    },
                  ]}
                />
              </Grid>
              <Grid>
                <ToolbarDropdownMenuWithRef
                  ref={container}
                  label="align"
                  options={[
                    {
                      label: 'left',
                      quillClassKey: 'align',
                      quillClassValue: undefined,
                    },
                    {
                      label: 'center',
                      quillClassKey: 'align',
                      quillClassValue: 'center',
                    },
                    {
                      label: 'right',
                      quillClassKey: 'align',
                      quillClassValue: 'right',
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonGroup
              aria-label="content-formatting"
              variant="text"
            >
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
              </ToolbarButtonWithRef>{' '}
              <ToolbarButtonWithRef
                ref={container}
                quillKey="indent"
                value="-1"
              >
                <FormatIndentDecreaseIcon />
              </ToolbarButtonWithRef>
              <ToolbarButtonWithRef
                ref={container}
                quillKey="indent"
                value="+1"
              >
                <FormatIndentIncreaseIcon />
              </ToolbarButtonWithRef>
              <ModuleLink ref={ref} />
              <MediaUpload ref={ref} upload={upload} />
              <ToolbarButtonWithRef
                ref={container}
                quillKey="fullscreen"
                onClick={() => setFullscreen(!fullscreen)}
              >
                {fullscreen ? (
                  <FullscreenExitIcon />
                ) : (
                  <FullscreenIcon />
                )}
              </ToolbarButtonWithRef>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
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
    </Paper>
  );
};

export default RichTextEditor;
