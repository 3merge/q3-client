import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import {
  TimelineContainer,
  TimelineMeta,
} from '../timeline';

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const Thread = ({ entries, toolbar }) =>
  entries.map((entry) => (
    <TimelineContainer
      key={entry.id}
      meta={
        <TimelineMeta
          date={entry.date}
          {...entry.createdBy}
        />
      }
    >
      <FormatQuoteIcon />
      <Box px={1} style={{ position: 'relative' }}>
        {toolbar && toolbar(entry)}
        <div
          style={{ fontSize: '1rem' }}
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{
            __html: decodeHTML(entry.message),
          }}
        />
      </Box>
    </TimelineContainer>
  ));

Thread.propTypes = {
  toolbar: PropTypes.nide,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.date,
      user: PropTypes.object,
      message: PropTypes.obj,
    }),
  ),
};

Thread.defaultProps = {
  toolbar: null,
  entries: [],
};

export default Thread;
