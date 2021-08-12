import React from 'react';
import {
  Box,
  TableRow,
  TableCell,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useToggle } from 'useful-state';
import ReactDiffViewer, {
  DiffMethod,
} from 'react-diff-viewer';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { green, red } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';

const TimelineDiff = ({ prev, next, children }) => {
  const { state, toggle } = useToggle();
  const { t } = useTranslation('labels');
  const theme = useTheme();
  const matches = useMediaQuery(
    theme.breakpoints.down('sm'),
  );

  const renderLink = () => (
    <IconButton
      aria-label={t('compareChanges')}
      onClick={toggle}
    >
      {state ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  );

  const renderDiff = () =>
    state ? (
      <TableRow>
        <TableCell colSpan="3">
          <Box p={1}>
            <div style={{ fontSize: '.833rem' }}>
              <ReactDiffViewer
                oldValue={prev}
                newValue={next}
                compareMethod={DiffMethod.WORDS}
                hideLineNumbers
                useDarkTheme={
                  theme?.palette?.type === 'dark'
                }
                styles={{
                  variables: {
                    light: {
                      diffViewerBackground:
                        theme.palette.background.paper,

                      addedBackground: fade(
                        green[100],
                        0.5,
                      ),
                      addedColor: green[900],
                      removedBackground: fade(
                        red[100],
                        0.5,
                      ),
                      removedColor: red[900],
                      wordAddedBackground: fade(
                        green[300],
                        0.8,
                      ),
                      wordRemovedBackground: fade(
                        red[300],
                        0.8,
                      ),
                      addedGutterBackground:
                        theme.palette.background.default,
                      removedGutterBackground:
                        theme.palette.background.default,
                      gutterBackground:
                        theme.palette.background.default,
                      gutterBackgroundDark:
                        theme.palette.background.default,
                      highlightBackground:
                        theme.palette.background.default,
                      highlightGutterBackground:
                        theme.palette.background.default,
                      codeFoldGutterBackground:
                        theme.palette.background.default,
                      codeFoldBackground:
                        theme.palette.background.default,
                      emptyLineBackground:
                        theme.palette.background.default,
                      gutterColor:
                        theme.palette.primary.main,
                      addedGutterColor:
                        theme.palette.primary.main,
                      removedGutterColor:
                        theme.palette.primary.main,
                      codeFoldContentColor:
                        theme.palette.primary.main,
                      diffViewerTitleBackground:
                        theme.palette.background.paper,
                      diffViewerTitleColor:
                        theme.palette.primary.main,
                      diffViewerTitleBorderColor:
                        theme.palette.background.paper,
                    },
                    dark: {
                      diffViewerBackground:
                        theme.palette.background.paper,
                      addedBackground: fade(
                        green[50],
                        0.15,
                      ),
                      addedColor: green[100],
                      removedBackground: fade(
                        red[50],
                        0.15,
                      ),
                      removedColor: red[100],
                      wordAddedBackground: fade(
                        green[900],
                        0.8,
                      ),
                      wordRemovedBackground: fade(
                        red[900],
                        0.8,
                      ),
                      addedGutterBackground:
                        theme.palette.background.default,
                      removedGutterBackground:
                        theme.palette.background.default,
                      gutterBackground:
                        theme.palette.background.default,
                      gutterBackgroundDark:
                        theme.palette.background.default,
                      highlightBackground:
                        theme.palette.background.default,
                      highlightGutterBackground:
                        theme.palette.background.default,
                      codeFoldGutterBackground:
                        theme.palette.background.default,
                      codeFoldBackground:
                        theme.palette.background.default,
                      emptyLineBackground:
                        theme.palette.background.default,
                      gutterColor:
                        theme.palette.primary.main,
                      addedGutterColor:
                        theme.palette.primary.main,
                      removedGutterColor:
                        theme.palette.primary.main,
                      codeFoldContentColor:
                        theme.palette.primary.main,
                      diffViewerTitleBackground:
                        theme.palette.background.paper,
                      diffViewerTitleColor:
                        theme.palette.primary.contrastColor,
                      diffViewerTitleBorderColor:
                        theme.palette.background.paper,
                    },
                  },
                }}
                {...(matches
                  ? {
                      splitView: false,
                    }
                  : {
                      splitView: true,
                      rightTitle: t('before'),
                      leftTitle: t('after'),
                    })}
              />
            </div>
          </Box>
        </TableCell>
      </TableRow>
    ) : null;

  return children({
    renderLink,
    renderDiff,
  });
};

export default TimelineDiff;
