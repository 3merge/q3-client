import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import localTimeInterceptors from '../src/helpers/localTimeInterceptors';
import { Form } from '../src/builders';

const Dates = ({ data }) =>
  data.map((t) => {
    return (
      <div>
        {' '}
        <span>UTC: {t[0]}</span>{' '}
        <span>
          Local:
          {t[1]}
        </span>{' '}
      </div>
    );
  });

const Timezone = () => {
  const [ds, setDs] = useState([]);

  const onSubmit = () => {
    return axios
      .get('https://rickandmortyapi.com/api/character/')
      .then(({ data }) => {
        const res = data.results;
        const result = res.map((d) => [
          moment(d.created)
            .utc()
            .format('YYYY/MM/DD/hh/mm'),
          moment(d.created).format('YYYY/MM/DD/hh/mm'),
        ]);
        setDs(result);
      });
  };

  localTimeInterceptors();

  return (
    <>
      <Form showSuccessMessage onSubmit={onSubmit}>
        <h2>Click the button to get times</h2>
      </Form>
      <Dates data={ds} />
    </>
  );
};

export default Timezone;
