import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import useTimezoneInterceptor from '../src/useTimezoneInterceptor';

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
  useTimezoneInterceptor();

  const [ds, setDs] = useState([]);

  const onClick = () =>
    axios
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

  return (
    <>
      <button type="button" onClick={onClick}>
        <h2>Click the button to get times</h2>
      </button>
      <Dates data={ds} />
    </>
  );
};

export default Timezone;
