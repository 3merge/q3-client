import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import { Alert } from '@material-ui/lab';
import { invoke } from 'lodash';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { browser } from 'q3-ui-helpers';
import { useToggle } from 'useful-state';
import withState from '../withState';

const useStyles = makeStyles((theme) => ({
  root: {
    '& #mui-rte-root': {
      marginTop: '-12px',
    },
    '& #mui-rte-editor, #mui-rte-editor-container': {
      height: 350,
      display: 'block',
    },
    '& #mui-rte-container div:not(:first-child)': {
      padding: '0 8px !important',
    },
    '& #mui-rte-editor [role="textbox"]': {
      height: 350,
      maxHeight: 350,
      overflow: 'scroll',
    },
  },
  paper: {
    padding: theme.spacing(0.5),
  },
  offset: {
    paddingLeft: 8,
  },
}));

const isFullScreen = () =>
  browser.isBrowserReady()
    ? !window.screenTop && !window.screenY
    : false;

const RichTextEditor = withState(
  ({ value, error, onChange, disabled, label }) => {
    const cls = useStyles();
    const { state, toggle } = useToggle(isFullScreen());

    const editorRef = React.useRef();
    const wrapperRef = React.useRef();

    const getInit = () => {
      try {
        const v = JSON.parse(value);
        return 'blocks' in v
          ? JSON.stringify(v)
          : undefined;
      } catch (e) {
        return undefined;
      }
    };

    const getUnsavedChanges = () => {
      invoke(editorRef, 'current.save');
    };

    const onClick = () => {
      if (!browser.isBrowserReady()) return;

      if (state)
        invoke(wrapperRef, 'current.requestFullscreen');
      else invoke(document, 'exitFullscreen');
      toggle();
    };

    return (
      <Grid item xs={12} className={cls.root}>
        <Paper className={cls.paper} ref={wrapperRef}>
          <Typography
            variant="overline"
            className={cls.offset}
          >
            {label}
          </Typography>
          <MUIRichTextEditor
            readOnly={disabled}
            label={label}
            ref={editorRef}
            onSave={onChange}
            onBlur={getUnsavedChanges}
            defaultValue={getInit()}
            controls={[
              'title',
              'bold',
              'italic',
              'underline',
              'link',
              'media',
              'numberList',
              'bulletList',
              'quote',
              'fullscreen',
            ]}
            customControls={[
              {
                name: 'fullscreen',
                icon: state ? (
                  <FullscreenIcon />
                ) : (
                  <FullscreenExitIcon />
                ),
                onClick,
                type: 'callback',
              },
            ]}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </Paper>
      </Grid>
    );
  },
);

RichTextEditor.propTypes = {};
RichTextEditor.defaultProps = {};

export default RichTextEditor;
