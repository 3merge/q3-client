import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { groupBy, map } from 'lodash';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import TitleIcon from '@material-ui/icons/Title';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import ToolbarButton from '../ToolbarButton';
import useStyle from './styles';

const RichTextEditor = ({ children, options }) => (
  <Grid container className={useStyle().root}>
    <Grid item>
      <>
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
        <ToolbarButton quillKey="strike">
          <StrikethroughSIcon />
        </ToolbarButton>
      </>
    </Grid>
    {Object.values(groupBy(options, 'group')).map(
      (buttons) => (
        <>
          <Divider
            orientation="vertical"
            style={{ margin: '0 1.5rem' }}
            flexItem
          />
          <Grid item style={{ display: 'flex' }}>
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
          </Grid>
        </>
      ),
    )}

    {children}
  </Grid>
);

export default React.memo(RichTextEditor);
