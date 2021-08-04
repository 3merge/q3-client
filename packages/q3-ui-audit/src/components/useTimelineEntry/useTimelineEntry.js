/* eslint-disable prefer-destructuring  */
import { object } from 'q3-ui-helpers';
import { get, isObject, capitalize } from 'lodash';
import {
  green,
  red,
  purple,
} from '@material-ui/core/colors';
import PolicyIcon from '@material-ui/icons/Policy';
import EjectIcon from '@material-ui/icons/Eject';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default () => {
  const entryMap = {
    added: {
      Icon: AddBoxIcon,
      color: green[900],
    },
    deleted: {
      Icon: EjectIcon,
      color: red[900],
    },
    updated: {
      Icon: PolicyIcon,
      color: purple[900],
    },
  };

  return (props) => {
    const text = Object.keys(entryMap).reduce(
      (acc, curr) =>
        object.hasKeys(get(props, curr)) ? curr : acc,
      'updated',
    );

    return {
      text,
      ...get(entryMap, text),

      getEntity() {
        const target = get(props, text);

        return isObject(target) &&
          Object.keys(target).length === 1 &&
          isObject(target[Object.keys(target)[0]])
          ? capitalize(Object.keys(target)[0])
          : '--';
      },

      getValue() {
        const v = get(props, text);
        if (!isObject(v)) return {};
        return v;
      },
    };
  };
};
