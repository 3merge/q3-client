import React from 'react';
import {
  Box,
  TableRow,
  TableCell,
  Link,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import { compact, get } from 'lodash';
import { useToggle } from 'useful-state';
import ReactDiffViewer, {
  DiffMethod,
} from 'react-diff-viewer';
import TimelineIcon from '../TimelineIcon';
import useTimelineEntry from '../useTimelineEntry';

export default ({ ...props }) => {
  const { state, toggle } = useToggle();
  const te = useTimelineEntry();
  const checkout = te(props);

  return (
    <>
      <TableRow>
        <TableCell style={{ padding: 4 }}>
          <TimelineIcon {...props} />
        </TableCell>
        <TableCell>
          {' '}
          {compact([
            get(props.user, 'firstName'),
            get(props.user, 'lastName'),
          ]).join(' ') || 'System'}
        </TableCell>
        <TableCell>{checkout.getEntity()}</TableCell>
        <TableCell
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {string.toDate(props.date)}
        </TableCell>
        <TableCell>
          <Link component="button" onClick={toggle}>
            Compare Changes
          </Link>
        </TableCell>
      </TableRow>
      {state && (
        <TableRow>
          <TableCell colSpan="5">
            <Box p={1}>
              <div style={{ fontSize: '.833rem' }}>
                <ReactDiffViewer
                  oldValue={checkout.format(
                    checkout.getPreviousValue(),
                  )}
                  newValue={checkout.format(
                    checkout.getCurrentValue(),
                  )}
                  compareMethod={DiffMethod.WORDS}
                  splitView={false}
                />
              </div>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
