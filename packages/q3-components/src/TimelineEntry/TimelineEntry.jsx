import React from 'react';
import PropTypes from 'prop-types';
import flat from 'flat';
import {
  get,
  compact,
  isObject,
  first,
  uniq,
  map,
  size,
  join,
} from 'lodash';
import { compose } from 'lodash/fp';
import { useTranslation } from 'react-i18next';
import TimelineCode from '../TimelineCode';

export const convertNestedPath = (str) =>
  String(str).replace(/(\.\d)/g, '.$');

const safe = (v) => (isObject(v) ? v : {});

const TimelineEntry = ({ data }) => {
  const { t } = useTranslation('labels');
  if (!data) return null;

  const makeEntryDataIterable = compose(
    Object.entries,
    flat,
    safe,
  );

  const renderFields = (prop, label) => {
    const formatted = makeEntryDataIterable(
      get(data, prop),
    ).map(([f, v]) => [convertNestedPath(f), v]);

    return size(formatted) < 20 ? (
      formatted.map(([f, v], idx) => (
        <TimelineCode
          key={`${f}${idx}`}
          label={label}
          value={compact([f, v]).join('=')}
        />
      ))
    ) : (
      <div>
        <code>
          {t('bulkOpOn', {
            fields: join(uniq(map(formatted, first)), ', '),
          })}
        </code>
      </div>
    );
  };

  return [
    renderFields('updatedFields', 'set'),
    renderFields('removedFields', 'unset'),
  ];
};

TimelineEntry.defaultProps = {
  data: null,
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
};

export default TimelineEntry;
