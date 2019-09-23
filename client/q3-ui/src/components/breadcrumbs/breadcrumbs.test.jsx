import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { materialMount } from '../../helpers/testUtils';
import Breadcrumbs from '.';

const withRouter = (entries = []) =>
  materialMount(() => (
    <MemoryRouter initialEntries={[entries.join('')]}>
      <Breadcrumbs />
    </MemoryRouter>
  ));

describe('Breadcrumbs', () => {
  it('should walk the entries with slashes in between', () => {
    const history = ['', '/foo', '/bar'];
    expect(withRouter(history).find('li')).toHaveLength(
      history.length * 2 - 1,
    );
  });
});
