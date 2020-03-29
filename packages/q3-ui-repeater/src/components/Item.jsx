import React from 'react';
import PropTypes from 'prop-types';
import { get, invoke } from 'lodash';
import TableRow from '@material-ui/core/TableRow';
import ItemActions from './ItemActions';
import useStyle from './useStyle';
import ItemHeader from './ItemHeader';
import withAttribute, { Attributes } from './Attribute';
import { override } from '../helpers';

//= ===============================================================================
// Helpers
//= ===============================================================================

export const interpretCardsProps = (
  cardProps = {},
  currentData = {},
  {
    disableEditor = false,
    disableMultiselect = false,
    disableRemove = false,
  },
) => ({
  ...cardProps,
  attributes: get(cardProps, 'attributes', []),
  color: invoke(cardProps, 'onColor', currentData),
  description: invoke(cardProps, 'describe', currentData),

  showEditor: !get(
    cardProps,
    'disableEditor',
    disableEditor,
  ),

  showMultiselect: !get(
    cardProps,
    'disableMultiselect',
    disableMultiselect,
  ),

  showRemove: !get(
    cardProps,
    'disableRemove',
    disableRemove,
  ),

  isIn: (v) =>
    Object.entries(get(cardProps, 'editable', {}))
      .filter(([key]) => key === v)
      .reduce(
        (obj, [key, value]) =>
          Object.assign(obj, {
            name: key,
            ...value,
          }),
        {},
      ),
});

//= ===============================================================================
// Component
//= ===============================================================================

const Item = ({
  parent,
  index,
  children,
  cardProps,
  showAttributes,
  renderMobileColumns,
  hasNested,
  toggleNested,
  nestedIsVisible,
  renderNestedTableRow,
  item,
  ...rest
}) => {
  const cls = useStyle({ hasNested });
  const [currentIndex, setCurrentIndex] = React.useState(
    index,
  );

  const {
    attributes,
    color,
    description,
    isIn,
    showEditor,
    showMultiselect,
    showRemove,
    title,
    icon,
    photo,
  } = interpretCardsProps(cardProps, item, rest);

  return (
    <TableRow className={cls.row}>
      <ItemHeader
        renderMobileColumns={renderMobileColumns}
        showMultiselect={showMultiselect}
        item={item}
        color={color}
        description={description}
        isIn={isIn}
        title={title}
        photo={photo}
        icon={icon}
      />
      <Attributes
        attributes={attributes}
        show={showAttributes}
        isIn={isIn}
        component={withAttribute({
          data: item,
        })}
      />
      <ItemActions
        parent={parent}
        index={index}
        showEditor={showEditor}
        showRemove={showRemove}
        toggleNested={toggleNested}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        nestedIsVisible={nestedIsVisible}
        renderNestedTableRow={renderNestedTableRow}
      >
        {children}
      </ItemActions>
    </TableRow>
  );
};

Item.propTypes = {
  children: PropTypes.node.isRequired,
  parent: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,

  cardProps: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  renderMobileColumns: PropTypes.func,
  ...override.propTypes,
};

Item.defaultProps = {
  renderMobileColumns: null,
  ...override.defaultProps,
};

export default Item;
