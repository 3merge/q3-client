import React from 'react';
import Dialog from 'q3-ui-dialog';
import FilterListIcon from '@material-ui/icons/FilterList';
import FilterComponent from 'q3-ui-filters';
import useLocation from 'q3-ui-filters/lib/components/useLocation';
import ButtonWithIcon from '../ButtonWithIcon';

// eslint-disable-next-line
const Filter = ({ data }) => {
  const loc = useLocation(data);
  const count = loc.makeCounter(loc.initialValues);
  let acc = 0;

  loc.map((item) => {
    acc += count(item);
    return null;
  });

  return (
    <Dialog
      title="filter"
      variant="drawer"
      closeOnSearchChange
      renderContent={() => <FilterComponent data={data} />}
      renderTrigger={(onClick) => (
        <ButtonWithIcon
          icon={FilterListIcon}
          label="filter"
          onClick={onClick}
          count={acc}
        />
      )}
    />
  );
};

Filter.defaultProps = {};
Filter.propTypes = {};

export default Filter;