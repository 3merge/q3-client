import React from 'react';
import Chip from '@material-ui/core/Chip';
import { uniq, compact, map, includes } from 'lodash';
import DoneIcon from '@material-ui/icons/Done';
import ThreadContext from '../ThreadContext';

export const getAllTags = (xs) =>
  map(uniq(compact(map(xs, 'tags').flat())), String);

const Tags = ({ data, tags, selectTag }) => {
  const { canTag } = React.useContext(ThreadContext);
  const allTags = getAllTags(data);

  const handleClick = (newTagValue) => () =>
    selectTag(newTagValue);

  return canTag
    ? map(allTags, (t) => (
        <Chip
          icon={
            includes(tags, t) ? <DoneIcon /> : undefined
          }
          key={t}
          label={t}
          onClick={handleClick(t)}
        />
      ))
    : null;
};

export default Tags;
