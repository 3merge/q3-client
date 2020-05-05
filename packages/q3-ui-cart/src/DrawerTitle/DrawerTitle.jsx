import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { string, object, array } from 'q3-ui-helpers';
import Hidden from '@material-ui/core/Hidden';
import { useTranslation } from 'react-i18next';
import { EditableTypography } from 'q3-components';
import { CartContext } from '../context';
import useStyle from './useStyle';
import { DRAWER_TITLE_ID } from '../constants';

const DrawerTitle = ({ titleKey }) => {
  const { t } = useTranslation('titles');
  const { root } = useStyle();

  const { items, updateOrder, ...rest } = React.useContext(
    CartContext,
  );

  const isEditable = Boolean(
    object.isFn(updateOrder) && array.hasLength(items),
  );

  let title = get(rest, titleKey);

  if (!string.hasLength(title)) title = t('cart');

  return (
    <Hidden smDown>
      <EditableTypography
        id={DRAWER_TITLE_ID}
        variant="h2"
        className={root}
        onSubmit={updateOrder}
        initialValues={{ title }}
        fieldProps={{ name: 'title', type: 'text' }}
        isEditable={isEditable}
      >
        {title}
      </EditableTypography>
    </Hidden>
  );
};

DrawerTitle.defaultProps = {
  titleKey: null,
};

DrawerTitle.propTypes = {
  /**
   * If provided, it will try to override the title
   * with a value from the context provider.
   */
  titleKey: PropTypes.string,
};

export default DrawerTitle;
