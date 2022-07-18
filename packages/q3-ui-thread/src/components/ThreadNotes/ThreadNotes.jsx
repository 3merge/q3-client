import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'q3-ui-locale';
import { map, orderBy, size, every, groupBy } from 'lodash';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import ThreadContextHttp from '../ThreadContextHttp';
import AlertEmpty from '../AlertEmpty';
import AlertFetchingError from '../AlertFetchingError';
import Note from '../Note';
import Search from '../Search';
import useThread from '../useThread';

const hasSize = (arrayOrString) => size(arrayOrString) > 1;
const lower = (str) => String(str).toLowerCase();

const ThreadNotes = ({ children, collectionName, id }) => {
  const {
    fetching,
    fetchingError,
    thread = [],
    ...http
  } = useThread(collectionName, id);
  const { t } = useTranslation('labels');

  const [search, setSearch] = React.useState('');
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

  const filteredData = React.useMemo(() => {
    const searchLength = hasSize(search);
    const tagLength = hasSize(tags);

    return searchLength || tagLength
      ? data.filter((item) => {
          const tagList = map(item.tags, String);
          let passes = true;

          if (searchLength) {
            const lowerCaseSearch = lower(search);
            const message = lower(item.message);
            const title = lower(item.title);

            passes =
              message.includes(lowerCaseSearch) ||
              title.includes(lowerCaseSearch);
          }

          if (tagLength && passes && hasSize(tagList))
            passes = every(tags, (tag) =>
              tagList.includes(String(tag)),
            );

          return passes;
        })
      : data;
  }, [data, search, tags]);

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

  const renderGroup = (key, title) => {
    const grouped = groupBy(filteredData, 'pin');
    const xs = grouped[key];

    return size(xs) ? (
      <Box mb={1}>
        <Typography
          variant="overline"
          style={{ textTransform: 'none' }}
        >
          {t(`labels:${title}`)}
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {map(xs, (note, idx) => (
            <Note
              data={data}
              key={note.id}
              selectTag={selectTag}
              timeout={idx * 150}
              {...http}
              {...note}
            />
          ))}
        </Box>
      </Box>
    ) : null;
  };

  if (fetching) return <CircularProgress />;
  if (fetchingError) return <AlertFetchingError />;

  return (
    <ThreadContextHttp.Provider value={http}>
      {children({
        data,
        changeSortDirection,
        sortDirection: sort,
        tags,
        selectTag,
        ...http,
      })}
      {size(data) > 1 && <Search handleInput={setSearch} />}
      {size(filteredData) ? (
        <>
          {renderGroup('true', 'pinned')}
          {renderGroup('false', 'posts')}
        </>
      ) : (
        <AlertEmpty />
      )}
    </ThreadContextHttp.Provider>
  );
};

ThreadNotes.propTypes = {
  children: PropTypes.func.isRequired,
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ThreadNotes;
