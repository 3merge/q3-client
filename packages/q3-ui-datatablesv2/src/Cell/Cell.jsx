import React from 'react';
import PropTypes from 'prop-types';
import { get, pick } from 'lodash';
import CellAvatar from '../CellAvatar';
import CellChip from '../CellChip';
import CellEmail from '../CellEmail';
import CellTel from '../CellTel';
import CellText from '../CellText';
import useStringHelper from '../useStringHelper';
import useStyle from './styles';

export const cellComponentMap = {
  avatar: CellAvatar,
  chip: CellChip,
  email: CellEmail,
  tel: CellTel,
  text: CellText,
};

export const stringify = (xs) =>
  JSON.stringify(
    pick(xs, ['children', 'component', 'format']),
  );

const Cell = ({
  children,
  component,
  sticky,
  ...props
}) => {
  const cls = useStyle();

  const SelectedCellComponent = get(
    cellComponentMap,
    component,
    CellText,
  );

  return (
    <td className={cls.cell}>
      <SelectedCellComponent {...props}>
        {useStringHelper(children, props)}
      </SelectedCellComponent>
    </td>
  );
};

Cell.defaultProps = {
  children: undefined,
  component: 'text',
  sticky: false,
};

Cell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  component: PropTypes.oneOf(Object.keys(cellComponentMap)),
  sticky: PropTypes.bool,
};

export default React.memo(
  Cell,
  (a, b) => stringify(a) === stringify(b),
);
