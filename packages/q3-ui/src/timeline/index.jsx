import React from 'react';
import moment from 'moment';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty';
import CollapsiblePanel, {
  Accordion,
} from '../collapsiblePanel';
import 'react-json-pretty/themes/acai.css';

const getName = (entry) =>
  `${get(entry, 'modifiedBy.firstName', '')} ${get(
    entry,
    'modifiedBy.lastName',
    '',
  )}`;

const Timeline = ({ entries }) => (
  <Accordion>
    {entries.map((entry) => (
      <CollapsiblePanel
        withoutBorder
        key={entry.id}
        description={
          <>
            <strong>{getName(entry)}</strong>
            {' on '}
            <i>{moment(entry.modifiedOn).format('LLL')}</i>
          </>
        }
      >
        <JSONPretty
          mainStyle="background-color: transparent"
          id={entry.id}
          data={entry.modified}
        />
      </CollapsiblePanel>
    ))}
  </Accordion>
);

Timeline.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      modifiedOn: PropTypes.date,
      modifiedBy: PropTypes.object,
      modified: PropTypes.obj,
    }),
  ),
};

Timeline.defaultProps = {
  entries: [],
};

export default Timeline;
