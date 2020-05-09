import React from 'react';
import useOptions from '../../helpers/useOptions';
import SelectBase from '../SelectBase';
import useDecorator from '../../helpers/useDecorator';

const Select = (props) => {
  const deco = useDecorator(props);

  const options = useOptions({
    minimumCharacterCount: 0,
    loadOptionsPlainly: true,
    ...props,
  });

  return <SelectBase {...options} {...deco} />;
};

export default Select;
