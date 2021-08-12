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
                useDarkTheme={
                  theme?.palette?.type === 'dark'
                }
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
