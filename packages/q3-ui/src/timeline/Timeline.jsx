import React from 'react';
import moment from 'moment';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty';
import { FixedSizeList } from 'react-window';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import Dialog from 'q3-ui-dialog';
import Button from '@material-ui/core/Button';
import { useValue } from 'useful-state';
import TextField from '@material-ui/core/TextField';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
import { array } from 'q3-ui-helpers';

export const formatUser = (u) =>
  ['firstName', 'lastName']
    .filter((name) => u[name])
    .map((name) => u[name])
    .join(' ') || null;

const getUpdatedAt = (data = {}, key) => {
  const at = get(data, key);
  return at
    ? moment
        .utc(at)
        .local()
        .format('MMMM Do YYYY, h:mm:ss a')
    : null;
};

export const getMeta = (authorshipKey, timeKey) => (
  data = {},
) => {
  const u = formatUser(get(data, authorshipKey));
  const d = getUpdatedAt(data, timeKey);
  let out = '';

  if (!u && !d) return null;
  if (u) out += u;
  if (d && u) {
    out += ` on ${d}`;
  } else if (d) {
    out += d;
  }

  return out;
};

const Row = (entries) => ({ index, style }) => {
  const { author, data } = entries[index];
  return (
    <Dialog
      title="log"
      renderContent={() => (
        <JSONPretty theme={JSONPrettyMon} data={data} />
      )}
      renderTrigger={(open) => (
        <Button style={style} onClick={open}>
          <OpenInBrowserIcon />
          {author}
        </Button>
      )}
    />
  );
};

const Timeline = ({ entries }) => {
  const { onChange, value } = useValue('');
  const listItems = array.filterByTerm(
    entries.map((item) => ({
      author: getMeta('modifiedBy', 'modifiedOn')(item),
      data: item.modified,
    })),
    value,
  );

  return (
    <>
      <TextField
        onChange={onChange}
        value={value}
        label="Search"
        size="small"
        fullWidth
      />
      <FixedSizeList
        itemCount={listItems.length}
        height={500}
        width="100%"
        itemSize={45}
      >
        {Row(listItems)}
      </FixedSizeList>
    </>
  );
};

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
