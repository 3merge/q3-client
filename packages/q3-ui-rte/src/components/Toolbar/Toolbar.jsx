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
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ToolbarButton from '../ToolbarButton';

const RichTextEditor = ({ children, options }) => {
  return (
    <Grid container>
      <Grid item>
        <ButtonGroup>
          <ToolbarButton quillKey="header" value="2">
            <TitleIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="bold">
            <FormatBoldIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="italic">
            <FormatItalicIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="underline">
            <FormatUnderlinedIcon />
          </ToolbarButton>
          <ToolbarButton quillKey="blockquote">
            <FormatQuoteIcon />
          </ToolbarButton>
        </ButtonGroup>
      </Grid>
      {Object.values(groupBy(options, 'group')).map(
        (buttons) => {
          return (
            <>
              <Hidden xsDown>
                <Divider
                  orientation="vertical"
                  style={{ margin: '0 1rem' }}
                  flexItem
                />
              </Hidden>
              <Grid item>
                <Hidden xsDown implementation="css">
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
                          <ToolbarButton {...button}>
                            <Icon />
                          </ToolbarButton>
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
};

export default RichTextEditor;
