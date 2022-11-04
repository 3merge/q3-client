import React from 'react';
// eslint-disable-next-line
import { EditableTypography } from 'q3-components';
import Title from '../../components/Title';
import { useTitle } from '../../hooks';
import useStyle from './styles';

const DetailHeader = (props) => {
  const { FieldProps, FormProps, editable, text, update } =
    useTitle(props);

  const cls = useStyle();

  return editable ? (
    <Title className={cls.h1}>
      <EditableTypography
        {...FormProps}
        component="span"
        fieldProps={FieldProps}
        isEditable
        onSubmit={update}
      >
        {text}
      </EditableTypography>
    </Title>
  ) : (
    <Title>{text}</Title>
  );
};

DetailHeader.defaultProps = {};
DetailHeader.propTypes = {};

export default DetailHeader;
