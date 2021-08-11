import React from 'react';
import {
  Box,
  TableRow,
  TableCell,
  Link,
} from '@material-ui/core';
import { useToggle } from 'useful-state';
import ReactDiffViewer, {
  DiffMethod,
} from 'react-diff-viewer';
import { useTranslation } from 'react-i18next';

const TimelineDiff = ({ prev, next, children }) => {
  const { state, toggle } = useToggle();
  const { t } = useTranslation('labels');

  const renderLink = () => (
    // eslint-disable-next-line
    <Link component="button" onClick={toggle}>
      {t('compareChanges')}
    </Link>
  );

  const renderDiff = () =>
    state ? (
      <TableRow>
        <TableCell colSpan="5">
          <Box p={1}>
            <div style={{ fontSize: '.833rem' }}>
              <ReactDiffViewer
                oldValue={prev}
                newValue={next}
                compareMethod={DiffMethod.WORDS}
                splitView={false}
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
