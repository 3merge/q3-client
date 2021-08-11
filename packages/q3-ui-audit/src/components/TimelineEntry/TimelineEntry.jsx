import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import { compact, get } from 'lodash';
import { useTranslation } from 'react-i18next';
import TimelineIcon from '../TimelineIcon';
import useTimelineEntry from '../useTimelineEntry';
import TimelineDiff from '../TimelineDiff';
import useStyle from './styles';

const TimelineEntry = ({ ...props }) => {
  const { t } = useTranslation('labels');
  const checkout = useTimelineEntry(props);
  const cls = useStyle();

  return (
    <TimelineDiff
      prev={checkout.format(checkout.getPreviousValue())}
      next={checkout.format(checkout.getCurrentValue())}
    >
      {({ renderDiff, renderLink }) => (
        <>
          <TableRow>
            <TableCell className={cls.padding}>
              <TimelineIcon {...props} />
            </TableCell>
            <TableCell>
              {compact([
                get(props.user, 'firstName'),
                get(props.user, 'lastName'),
              ]).join(' ') || t('systemAutomated')}
            </TableCell>
            <TableCell>{checkout.getEntity()}</TableCell>
            <TableCell className={cls.nowrap}>
              {string.toDate(props.date)}
            </TableCell>
            <TableCell>{renderLink()}</TableCell>
          </TableRow>
          {renderDiff()}
        </>
      )}
    </TimelineDiff>
  );
};

TimelineEntry.defaultProps = {
  user: null,
};

TimelineEntry.propTypes = {
  date: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default TimelineEntry;
