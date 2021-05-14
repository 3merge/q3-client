import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography, Chip } from '@material-ui/core';
import { map } from 'lodash';

const Docs = ({
  children,
  title,
  body,
  keyWords,
  updatedAt,
  lastModifiedBy,
  content,
}) => (
  <Box>
    {children}
    <Typography variant="h1">{title}</Typography>
    {map(keyWords, (keyWord) => (
      <Chip key={keyWord} label={keyWord} />
    ))}
    {/* eslint-disable-next-line */}
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </Box>
);

export default Docs;
