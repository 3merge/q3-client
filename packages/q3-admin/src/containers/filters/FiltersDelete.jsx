import React from 'react';
import { get } from 'lodash';
import Button from '@material-ui/core/Button';
import { AuthContext } from 'q3-ui-permissions';
import { Definitions } from '../state';

const FiltersDelete = ({ name, ...etc }) => {
  const { collectionName } = React.useContext(Definitions);
  const { state, update } = React.useContext(AuthContext);
  const filters = get(state, 'profile.filters', {});
  const items = get(filters, collectionName, {});

  const deleteSegment = () => {
    const copy = { ...items };
    delete copy[name];

    return update({
      filters: {
        ...filters,
        [collectionName]: copy,
      },
    });
  };

  return (
    <Button
      {...etc}
      onClick={deleteSegment}
      disabled={!name}
    >
      Delete
    </Button>
  );
};

export default FiltersDelete;
