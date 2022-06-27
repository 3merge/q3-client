import React from 'react';
import PropTypes from 'prop-types';
import ActionBarExport from '../../components/ActionBarExport';
import ActionBarImport from '../../components/ActionBarImport';

const TableIo = ({ io }) => (
  <>
    <ActionBarExport {...io} />
    <ActionBarImport {...io} />
  </>
);

/**
 *  {renderer
              ? renderer({
                  data,
                  checked,
                })
              : null}
 * 
 */

TableIo.defaultProps = {
  io: null,
};

TableIo.propTypes = {
  io: PropTypes.shape({}),
};

export default TableIo;
