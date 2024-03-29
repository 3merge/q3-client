import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import FilterComponent from 'q3-ui-filters';
import useLocation from 'q3-ui-filters/lib/components/useLocation';
import ButtonWithIconDialog from '../ButtonWithIconDialog';
import { Definitions } from '../../containers/state';

// eslint-disable-next-line
const Filter = ({ data }) => {
  const loc = useLocation(data);
  const { collectionName } = React.useContext(Definitions);
  const count = loc.makeCounter(loc.initialValues);
  let acc = 0;

  loc.map((item) => {
    acc += count(item);
    return null;
  });

  return (
    <ButtonWithIconDialog
      DialogProps={{
        closeOnSearchChange: true,
      }}
      id="filter-button"
      icon={FilterListIcon}
      label="filter"
      count={acc}
      transparent
      renderContent={() => (
        <FilterComponent
          collectionName={collectionName}
          data={data}
        />
      )}
    />
  );
};

Filter.defaultProps = {};
Filter.propTypes = {};

export default Filter;
