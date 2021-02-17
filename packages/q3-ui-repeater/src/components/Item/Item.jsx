import React from 'react';
import PropTypes from 'prop-types';
import { get, invoke, isFunction } from 'lodash';
import TableRow from '@material-ui/core/TableRow';
import Attribute from '../Attribute';
import ItemActions from '../ItemActions';
import ItemHeader from '../ItemHeader';
import withEditableTypography from '../withEditableTypography';
import useStyle from '../useStyle';
import { override } from '../../helpers';
import RepeaterContext from '../state';

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
  description: isFunction(cardProps.describe)
    ? invoke(cardProps, 'describe', currentData)
    : get(currentData, cardProps.describe),

  linkTo: invoke(cardProps, 'makeLink', currentData),
  linkToLabel: invoke(
    cardProps,
    'makeLinkLabel',
    currentData,
  ),

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
  // aliase for cardProps
  rowResolver,
  renderMobileColumns,
  hasNested,
  toggleNested,
  nestedIsVisible,
  renderNestedTableRow,
  item,
}) => {
  const ctx = React.useContext(RepeaterContext);
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
    linkTo,
    linkToLabel,
  } = interpretCardsProps(
    rowResolver || cardProps,
    item,
    ctx,
  );

  React.useEffect(() => {
    setCurrentIndex(index);
  }, [parent.length]);

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
      <Attribute
        attributes={attributes}
        isIn={isIn}
        component={withEditableTypography({
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
        linkTo={linkTo}
        linkToLabel={linkToLabel}
        nestedIsVisible={nestedIsVisible}
        renderNestedTableRow={renderNestedTableRow}
        {...item}
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
  }),

  rowResolver: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),

  item: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
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
