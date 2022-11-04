import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { EditableTypography } from 'q3-components';
import Typography from '@material-ui/core/Typography';
import { useAuth } from 'q3-ui-permissions';
import { isFunction } from 'lodash';
import { useTitle } from '../../hooks';
import { Dispatcher, Store, Definitions } from '../state';
import useStyle from './styles';

const DetailHeader = (props) => {
  const { collectionName } = React.useContext(Definitions);
  const { data } = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);
  const auth = useAuth(collectionName);
  const text = useTitle(data, props);
  const cls = useStyle();

  const { editable, titleProp: name } = props;
  const { canEditSub } = auth;
  const typographyProps = {
    component: 'h1',
    id: 'detail-title',
    variant: 'h3',
  };

  const isEditable = React.useCallback(
    () =>
      isFunction(editable)
        ? editable(data, auth)
        : editable === true,
    [editable],
  );

  return name && canEditSub(name) && isEditable() ? (
    <Typography {...typographyProps} className={cls.h1}>
      <EditableTypography
        component="span"
        fieldProps={{
          name,
          required: true,
          type: 'text',
        }}
        isEditable
        initialValues={{
          [name]: text,
        }}
        onSubmit={patch()}
      >
        {text}
      </EditableTypography>
    </Typography>
  ) : (
    <Typography {...typographyProps}>{text}</Typography>
  );
};

DetailHeader.defaultProps = {
  editable: false,
  titleProp: undefined,
};

DetailHeader.propTypes = {
  editable: PropTypes.bool,
  titleProp: PropTypes.string,
};

export default DetailHeader;
