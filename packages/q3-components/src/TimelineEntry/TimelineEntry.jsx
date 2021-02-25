import React from 'react';
import PropTypes from 'prop-types';
import flat from 'flat';
import { get, join, compact, isObject } from 'lodash';
import { compose } from 'lodash/fp';
import TimelineCode from '../TimelineCode';

const convertNestedPath = (str) =>
  String(str).replace(/(\.\d)/g, '.$');

const makePathArray = (data) =>
  compact(
    ['path', 'index'].flatMap((key) => get(data, key)),
  );

const joinPaths = (a) => join(compact(a), '.');

const reassignKeys = (obj, path) =>
  isObject(obj)
    ? Object.entries(obj).reduce(
        (acc, [key, value]) =>
          Object.assign(acc, {
            [joinPaths([path, key])]: value,
          }),
        {},
      )
    : { [path]: obj };

const TimelineEntry = ({ data, prevPath = '' }) => {
  if (!data) return null;

  const path = joinPaths(
    [prevPath].concat(makePathArray(data)),
  );

  const makeEntryDataIterable = compose(
    Object.entries,
    flat,
    reassignKeys,
  );

  return (
    <div>
      <TimelineEntry entry={data.item} prevPath={path} />
      {makeEntryDataIterable(data.rhs, path)
        .map(([f, v]) => [convertNestedPath(f), v])
        .map(([f, v], idx) => (
          <TimelineCode
            key={`${f}${idx}`}
            label={v ? 'set' : 'unset'}
            value={compact([f, v]).join('=')}
          />
        ))}
    </div>
  );
};

TimelineEntry.defaultProps = {
  data: null,
  prevPath: '',
};

TimelineEntry.propTypes = {
  data: PropTypes.shape({
    // eslint-disable-next-line
    item: PropTypes.object,
    path: PropTypes.string,
    index: PropTypes.number,
    // eslint-disable-next-line
    rhs: PropTypes.anything,
    // eslint-disable-next-line
    lhs: PropTypes.anything,
  }),
  prevPath: PropTypes.string,
};

export default TimelineEntry;
