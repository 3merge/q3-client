import React from 'react';
import Container from '@material-ui/core/Container';
import { map } from 'lodash';

const List = ({ files, siblings }) => (
  <Container>
    {map(siblings, (sib) => (
      <button onClick={sib.onClick}>{sib.name}</button>
    ))}
    <ul>
      {map(files, (file) => (
        <li>{file.name}</li>
      ))}
    </ul>
  </Container>
);

export default List;
