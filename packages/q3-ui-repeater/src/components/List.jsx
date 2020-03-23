import React from 'react';
import PropTypes from 'prop-types';
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

  return data.filter(testSearchTerm).map((item, i) => (
    <Item
      key={i}
      parent={data}
      item={item}
      index={i}
      {...rest}
    >
      {children}
    </Item>
  ));
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
