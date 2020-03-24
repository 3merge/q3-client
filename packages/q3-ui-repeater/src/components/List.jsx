import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import RepeaterState from './state';
import Empty from './Empty';
import Item from './Item';

const List = ({ children, data, ...rest }) => {
  const {
    search: { value },
  } = React.useContext(RepeaterState);

  if (!Array.isArray(data) || data.length < 1)
    return <Empty />;

  const testSearchTerm = (item) =>
    !value.length ||
    new RegExp(value, 'gi').test(JSON.stringify(item));

  return (
    <Box mt={1}>
      <Grid container spacing={1}>
        {data.filter(testSearchTerm).map((item, i) => (
          <Grid item md={6} xs={12}>
            <Item
              key={i}
              parent={data}
              item={item}
              index={i}
              {...rest}
            >
              {children}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
