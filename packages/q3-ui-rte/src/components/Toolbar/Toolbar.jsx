import React from 'react';
import {
  ButtonGroup,
  Grid,
  Divider,
  Hidden,
} from '@material-ui/core';
import { groupBy, map } from 'lodash';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import TitleIcon from '@material-ui/icons/Title';
import ToolbarButton from '../ToolbarButton';
import withActiveFormatting from '../withActiveFormatting';

const RichTextEditor = React.forwardRef(
  ({ children, options }, ref) => {
    const ToolbarButtonWithRef = withActiveFormatting(
      ToolbarButton,
    );

    return (
      <Grid container>
        <Grid item>
          <ButtonGroup>
            <ToolbarButtonWithRef
              ref={ref}
              quillKey="header"
              value="2"
            >
              <TitleIcon />
            </ToolbarButtonWithRef>
            <ToolbarButtonWithRef ref={ref} quillKey="bold">
              <FormatBoldIcon />
            </ToolbarButtonWithRef>
            <ToolbarButtonWithRef
              ref={ref}
              quillKey="italic"
            >
              <FormatItalicIcon />
            </ToolbarButtonWithRef>
            <ToolbarButtonWithRef
              ref={ref}
              quillKey="underline"
            >
              <FormatUnderlinedIcon />
            </ToolbarButtonWithRef>
          </ButtonGroup>
        </Grid>
        {Object.values(groupBy(options, 'group')).map(
          (buttons) => {
            return (
              <>
                <Hidden mdDown>
                  <Divider
                    orientation="vertical"
                    style={{ margin: '0 1rem' }}
                    flexItem
                  />
                </Hidden>
                <Grid item>
                  <Hidden mdDown implementation="css">
                    <ButtonGroup>
                      {map(
                        buttons,
                        ({
                          component: Component,
                          icon: Icon,
                          ...button
                        }) =>
                          Component ? (
                            <Component {...button} />
                          ) : (
                            <ToolbarButtonWithRef
                              ref={ref}
                              {...button}
                            >
                              <Icon />
                            </ToolbarButtonWithRef>
                          ),
                      )}
                    </ButtonGroup>
                  </Hidden>
                </Grid>
              </>
            );
          },
        )}

        {children}
      </Grid>
    );
  },
);

export default RichTextEditor;
