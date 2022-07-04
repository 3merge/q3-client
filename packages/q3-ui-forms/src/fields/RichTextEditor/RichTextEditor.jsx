import React from 'react';
import Rte from 'q3-ui-rte';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import withState from '../withState';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:focus-within fieldset': {
      borderColor: theme.palette.primary.main,
    },

    '& .ql-toolbar': {
      boxShadow: 'none',
      borderBottom: `1px solid ${theme.palette.background.muted}`,
    },
  },
}));

const RichTextEditor = withState(
  ({ label, onChange, name, error, value, ...rest }) => {
    const cls = useStyles();
    const editorRef = React.useRef();

    return React.useMemo(
      () => (
        <Grid item xs={12} className={cls.root}>
          <OutlinedInput
            fullWidth
            label={label}
            error={error}
            inputComponent={() => (
              <Box
                className="q3-forms-rte-wrapper"
                bgcolor="background.paper"
                overflow="initial"
                p={0.15}
                width="100%"
              >
                <Rte
                  id={name}
                  ref={editorRef}
                  defaultValue={value}
                  onChange={(newState) =>
                    onChange({
                      target: {
                        value: newState,
                      },
                    })
                  }
                  {...rest}
                />
              </Box>
            )}
          />
        </Grid>
      ),
      [],
    );
  },
);

RichTextEditor.propTypes = {};
RichTextEditor.defaultProps = {};

export default RichTextEditor;
