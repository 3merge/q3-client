import React from 'react';
import { Link } from '@reach/router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Definitions } from '../state';
import { useActiveFilter } from '../../hooks';

const Segements = () => {
  const { location } = React.useContext(Definitions);
  const { active, filters } = useActiveFilter(
    location?.search,
  );

  const listItems = [
    {
      label: 'All',
      searchValue: '?active',
    },
    ...filters,
  ];

  return (
    <Tabs value={active || '?active'}>
      {listItems.map(({ searchValue, label }) => (
        <Tab
          key={label}
          component={Link}
          to={searchValue}
          label={label}
          value={searchValue}
        />
      ))}
    </Tabs>
  );
};

Segements.propTypes = {};

export default Segements;
