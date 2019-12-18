import * as yup from 'yup';
import { Validator } from '../helpers/validation';

export class ValidationChainFacade {
  getChain() {
    return yup.object().shape(this.$chain);
  }

  setField(k, props) {
    if (!this.$chain) this.$chain = {};
    this.$chain[k] = new Validator(props).build();
  }
}
