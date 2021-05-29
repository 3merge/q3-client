import React from 'react';
import {
  createShallow,
  createMount,
} from '@material-ui/core/test-utils';

const shallow = createShallow();
const mount = createMount();

export const materialShallow = (Comp, props = {}) =>
  shallow(<Comp {...props} />);

export const materialMount = (Comp, props = {}) =>
  mount(<Comp {...props} />);

export const mockRequest = (resolver) => (term) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(resolver(term)), 500),
  );
