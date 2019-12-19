import React from 'react';
import { ValidationChainFacade } from './utils';

export default React.createContext({
  validation: new ValidationChainFacade(),
});
