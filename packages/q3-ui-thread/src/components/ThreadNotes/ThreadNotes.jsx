import React from 'react';
import PropTypes from 'prop-types';
import { map, orderBy, size, every, groupBy } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertEmpty from '../AlertEmpty';
import AlertFetchingError from '../AlertFetchingError';
import Note from '../Note';
import useThread from '../useThread';

const ThreadNotes = ({ children, collectionName, id }) => {
  const {
    fetching,
    fetchingError,
    thread = [],
    ...http
  } = useThread(collectionName, id);

  const [sort, setSort] = React.useState('asc');
  const [tags, setTags] = React.useState([]);

  const data = React.useMemo(
    () =>
      orderBy(
        thread,
        ['createdAt', 'updatedAt'],
        [sort, sort],
      ),
    [thread, sort],
  );

  const filteredData = React.useMemo(
    () =>
      size(tags)
        ? data.filter((item) => {
            const tagList = map(item.tags, String);

            return (
              size(tagList) &&
              every(tags, (t) =>
                tagList.includes(String(t)),
              )
            );
          })
        : data,
    [data, tags],
  );

  const changeSortDirection = (xs) => {
    const newSort = String(xs).toLowerCase();
    return ['asc', 'desc'].includes(newSort)
      ? setSort(newSort)
      : null;
  };

  const selectTag = (xs) =>
    setTags((prev = []) => {
      if (!xs) return prev;
      if (!Array.isArray(prev)) return [xs];
      return prev.includes(xs)
        ? prev.filter((item) => item !== xs)
        : prev.concat(xs);
    });

  if (fetching) return <CircularProgress />;
  if (fetchingError) return <AlertFetchingError />;

  return (
    <>
      {children({
        data,
        changeSortDirection,
        sortDirection: sort,
        tags,
        selectTag,
        ...http,
      })}
      {size(filteredData) ? (
        Object.values(groupBy(filteredData, 'pin'))
          // "true" is less than "false" in object order
          .reverse()
          .map((notes) =>
            map(notes, (note) => (
              <Note key={note.id} {...note} />
            )),
          )
      ) : (
        <AlertEmpty />
      )}
    </>
  );
};

ThreadNotes.propTypes = {
  children: PropTypes.func.isRequired,
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ThreadNotes;
