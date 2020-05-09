import React from 'react';
import useDecorator from '../../helpers/useDecorator';
import { handleDateChange } from '../dateRange';
import DateBase from '../DateBase';

const Date = (props) => {
  const { value, onChange, name, ...deco } = useDecorator(
    props,
  );

  return (
    <DateBase
      {...deco}
      name={name}
      onChange={handleDateChange(onChange, name)}
      value={value || ''}
    />
  );
};

export default Date;
