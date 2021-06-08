import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Box } from '@material-ui/core';
import TableIo from '../TableIo';
import { Store } from '../state';
import Add from '../add';
import { useAppContext } from '../../hooks';
import useStyles from './styles';
import withActionPortal from '../../components/withActionPortal';

const CollectionActions = ({
  addComponent: AddForm,
  io,
}) => {
  const cls = useStyles();
  const { can } = useAppContext({
    io: (
      <TableIo
        data={React.useContext(Store).data}
        io={io}
      />
    ),
    add: AddForm ? (
      <Add>
        <AddForm />
      </Add>
    ) : null,
  });

  return (
    <>
      {can('io')}
      {can('add')}
    </>
  );
};

CollectionActions.defaultProps = {
  addComponent: null,
  io: null,
};

CollectionActions.propTypes = {
  addComponent: PropTypes.node,
  io: PropTypes.shape({
    exports: PropTypes.arrayOf(PropTypes.string),
    imports: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default withActionPortal(CollectionActions, {
  elementId: 'q3-collection-actions-top',
});
