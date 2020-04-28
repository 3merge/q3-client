import { genLazy } from 'q3-admin/lib/builders';
import Investors from './Investors';

export default [
  {
    home: true,
    component: genLazy(import('./Dashboard')),
  },
  ...Investors,
];
