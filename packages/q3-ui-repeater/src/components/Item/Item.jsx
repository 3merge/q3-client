import React from 'react';
import PropTypes from 'prop-types';
import {
  pick,
  get,
  isFunction,
  isEqual,
  isString,
  isNil,
} from 'lodash';
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
) => {
  const getValue = (xs, defaultValue) => {
    const v = get(cardProps, xs);

    if (isFunction(v)) return v(currentData);
    if (isString(v)) return get(currentData, v);
    return !isNil(v) ? v : defaultValue;
  };

  const negate = (xs) => !xs;

  return {
    ...cardProps,
    actions: get(cardProps, 'actions', []),
    attributes: get(cardProps, 'attributes', []),
    color: getValue('onColor', currentData),
    description: getValue('describe'),
    title: getValue('title'),

    showEditor: negate(
      getValue('disableEditor', disableEditor),
    ),

    showMultiselect: negate(
      getValue('disableMultiselect', disableMultiselect),
    ),

    showRemove: negate(
      getValue('disableRemove', disableRemove),
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
  };
};

//= ===============================================================================
// Component
//= ===============================================================================

const Item = ({
  children,
  cardProps,
  // alias for cardProps
  rowResolver,
  renderMobileColumns,
  hasNested,
  toggleNested,
  nestedIsVisible,
  renderNestedTableRow,
  item,
  ctx,
  under,
  collectionName,
}) => {
  const cls = useStyle({
    id: item?.id,
    hasNested,
  });

  const {
    actions,
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
  } = interpretCardsProps(
    rowResolver || cardProps,
    item,
    ctx,
  );

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
          collectionName,
          under,
        })}
      />
      <ItemActions
        actions={actions}
        showEditor={showEditor}
        showRemove={showRemove}
        toggleNested={toggleNested}
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

const BlockWastedRenders = React.memo(
  Item,
  (prev, curr) =>
    isEqual(prev?.item, curr?.item) &&
    isEqual(prev?.ctx, curr?.ctx) &&
    prev?.nestedIsVisible === curr?.nestedIsVisible,
);

export default (props) => (
  <BlockWastedRenders
    {...props}
    ctx={pick(React.useContext(RepeaterContext), [
      'disableEditor',
      'disableMultiselect',
      'disableRemove',
    ])}
  />
);
