import React from 'react';
import PropTypes from 'prop-types';
import { get, map, uniqBy } from 'lodash';
import { Box, Typography } from '@material-ui/core';
import useStyle from './useStyle';

const TooltipList = ({ data }) => {
  const cls = useStyle();
  return (
    <Box
      className={cls.root}
      component="ul"
      margin={0}
      padding={0}
    >
      {map(uniqBy(data, 'name'), ({ name, payload }, i) => (
        <Typography
          className={cls.item}
          component="li"
          key={`${name}-${i}`}
        >
          <u>{name}</u>: {get(payload, name)}
        </Typography>
      ))}
    </Box>
  );
};

TooltipList.defaultProps = {
  data: [],
};

TooltipList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.String,
      payload: PropTypes.shape({}),
    }),
  ),
};

export default TooltipList;
