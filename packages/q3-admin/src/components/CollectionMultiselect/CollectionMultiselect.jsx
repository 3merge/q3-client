import React from 'react';
import PropTypes from 'prop-types';
import { SelectOne, SelectAll } from 'q3-ui-exports';
import { map } from 'lodash';
import { Store } from '../../containers/state';
import { useMultiselect } from '../../hooks';

const CollectionMultiselect = ({ id }) => {
  const { data } = React.useContext(Store);

  if (!useMultiselect()) return null;

  return id ? (
    <SelectOne id={id} />
  ) : (
    <SelectAll ids={map(data, 'id')} />
  );
};

CollectionMultiselect.defaultProps = {
  id: undefined,
};

CollectionMultiselect.propTypes = {
  id: PropTypes.string,
};

export default CollectionMultiselect;
