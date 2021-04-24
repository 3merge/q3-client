import React from 'react';
import Rte from 'q3-ui-rte';
import { Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useToggle } from 'useful-state';
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
  ({ label, name, onChange, error, value }) => {
    const cls = useStyles({});
    const editorRef = React.useRef();
    const { open, state, close } = useToggle();

    return (
      <Grid item xs={12} className={cls.root}>
        <OutlinedInput
          fullWidth
          label={label}
          error={error}
          inputComponent={
            state
              ? () => (
                  <Box
                    overflow="hidden"
                    p={0.15}
                    width="100%"
                  >
                    <Paper>
                      <Rte
                        autofocus
                        id={name}
                        ref={editorRef}
                        defaultValue={value}
                        onBlur={(nextValue) => {
                          onChange({
                            target: {
                              value: nextValue,
                            },
                          });

                          editorRef.current.remove();
                          close();
                        }}
                      />
                    </Paper>
                  </Box>
                )
              : (props) => (
                  <div
                    {...props}
                    aria-label="open-editor"
                    role="button"
                    onClick={open}
                    style={{ height: 'auto' }}
                    dangerouslySetInnerHTML={{
                      __html: value,
                    }}
                  />
                )
          }
        />
      </Grid>
    );
  },
);

RichTextEditor.propTypes = {};
RichTextEditor.defaultProps = {};

export default RichTextEditor;
