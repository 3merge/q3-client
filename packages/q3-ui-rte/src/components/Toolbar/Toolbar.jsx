import React from 'react';
import {
  ButtonGroup,
  Grid,
  Divider,
} from '@material-ui/core';
import { groupBy, map } from 'lodash';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import TitleIcon from '@material-ui/icons/Title';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ToolbarButton from '../ToolbarButton';
import useStyle from './styles';

const RichTextEditor = ({ children, options }) => (
  <Grid container className={useStyle().root}>
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
      (buttons) => (
        <>
          <Divider
            orientation="vertical"
            style={{ margin: '0 1rem' }}
            flexItem
          />
          <Grid item>
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
          </Grid>
        </>
      ),
    )}

    {children}
  </Grid>
);

export default React.memo(RichTextEditor);
