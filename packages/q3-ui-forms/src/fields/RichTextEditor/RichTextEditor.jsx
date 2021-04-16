import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import { Alert } from '@material-ui/lab';
import { invoke } from 'lodash';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import withState from '../withState';

const useStyles = makeStyles((theme) => ({
  root: {
    '& #mui-rte-root': {
      marginTop: '-12px',
    },
    '& #mui-rte-editor, #mui-rte-editor-container': {
      maxHeight: 550,
      display: 'block',
      transition: 'min-height 150ms',
    },
    '& #mui-rte-container div:not(:first-child)': {
      padding: '0 8px !important',
    },
    '& #mui-rte-editor [role="textbox"]': {
      maxHeight: 550,
      overflow: 'auto',
      transition: 'min-height 150ms',
    },
  },
  paper: {
    backgroundColor: 'inherit',
    padding: theme.spacing(0.5),
    boxShadow: 'none',
    '&:focus-within, &:hover': {
      boxShadow: theme.shadows[1],
      background: theme.palette.background.paper,
    },
    '&:focus-within': {
      '& #mui-rte-editor, #mui-rte-editor-container, & #mui-rte-editor [role="textbox"]': {
        minHeight: 175,
      },
    },
    transition: 'background,box-shadow 350ms',
  },
  offset: {
    paddingLeft: 8,
  },
}));

const RichTextEditor = withState(
  ({ value, error, onChange, disabled, label }) => {
    const cls = useStyles({});
    const { t } = useTranslation('helpers');

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
            label={t('startTyping')}
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
