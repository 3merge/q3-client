import React from 'react';
import { Editable } from 'q3-ui-forms/lib/adapters';
import Title from '../../components/Title';
import { useTitle } from '../../hooks';
import useStyle from './styles';

const DetailHeader = (props) => {
  const {
    FieldProps,
    FormProps,
    editable,
    editableComponent,
    text,
    update,
  } = useTitle(props);

  const cls = useStyle();

  if (editable && editableComponent)
    return editableComponent(
      FieldProps,
      FormProps,
      update,
      {
        className: cls.h1,
        text,
      },
    );

  return editable ? (
    <Title className={cls.h1}>
      <Editable
        {...FormProps}
        {...FieldProps}
        onSubmit={update}
        text={text}
      />
    </Title>
  ) : (
    <Title>{text}</Title>
  );
};

DetailHeader.defaultProps = {};
DetailHeader.propTypes = {};

export default DetailHeader;
