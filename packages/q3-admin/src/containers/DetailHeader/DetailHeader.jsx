import React from 'react';
// eslint-disable-next-line
import { EditableTypography } from 'q3-components';
import Typography from '@material-ui/core/Typography';
import { useTitle } from '../../hooks';
import useStyle from './styles';

const DetailHeader = (props) => {
  const { FieldProps, FormProps, editable, text, update } =
    useTitle(props);

  const cls = useStyle();
  const typographyProps = {
    component: 'h1',
    id: 'detail-title',
    variant: 'h3',
  };

  return editable ? (
    <Typography {...typographyProps} className={cls.h1}>
      <EditableTypography
        {...FormProps}
        component="span"
        fieldProps={FieldProps}
        isEditable
        onSubmit={update}
      >
        {text}
      </EditableTypography>
    </Typography>
  ) : (
    <Typography {...typographyProps}>{text}</Typography>
  );
};

DetailHeader.defaultProps = {};
DetailHeader.propTypes = {};

export default DetailHeader;
