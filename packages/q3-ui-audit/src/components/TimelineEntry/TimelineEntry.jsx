import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Hidden,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import { compact, get } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import TimelineIcon from '../TimelineIcon';
import useTimelineEntry from '../useTimelineEntry';
import TimelineDiff from '../TimelineDiff';
import useStyle from './styles';

const TimelineEntry = ({ ...props }) => {
  const { t } = useTranslation('labels');
  const checkout = useTimelineEntry(props);
  const cls = useStyle();

  const makeDescription = () => {
    const entity = checkout.getEntity();
    return entity === '--'
      ? t(`descriptions:${checkout.text}AuditLog`)
      : t(`descriptions:${checkout.text}AuditLogExpanded`, {
          entity,
        });
  };

  return (
    <TimelineDiff
      prev={checkout.format(checkout.getPreviousValue())}
      next={checkout.format(checkout.getCurrentValue())}
    >
      {({ renderDiff, renderLink }) => (
        <>
          <TableRow>
            <TableCell className={cls.padding}>
              <ListItem
                component="div"
                dense
                className={cls.listItem}
              >
                <Hidden smDown>
                  <ListItemAvatar>
                    <TimelineIcon {...props} />
                  </ListItemAvatar>
                </Hidden>
                <ListItemText
                  primary={
                    compact([
                      get(props.user, 'firstName'),
                      get(props.user, 'lastName'),
                    ]).join(' ') || t('systemAutomated')
                  }
                  secondary={makeDescription()}
                />
              </ListItem>
            </TableCell>
            <TableCell style={{ width: 135 }}>
              <small style={{ whiteSpace: 'break-spaces' }}>
                {string.toDate(props.date)}
              </small>
            </TableCell>
            <TableCell style={{ width: 41 }}>
              {renderLink()}
            </TableCell>
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
