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
        let output = '--';

        const recurse = (target) => {
          if (object.countKeys(target) === 1) {
            const key = Object.keys(target)[0];
            if (isObject(target[key])) {
              output = capitalize(key);
              recurse(target[key]);
            }
          }
        };

        recurse(get(props, text));
        return output;
      },

      getValue() {
        const v = get(props, text);
        if (!isObject(v)) return {};
        return v;
      },

      getPreviousValue() {
        if (text === 'deleted') return get(props, text);
        if (text === 'added') return {};
        return get(props, 'previous', {});
      },

      getCurrentValue() {
        if (text === 'deleted') return {};
        return get(props, text);
      },

      format(xs) {
        return object.hasKeys(xs)
          ? JSON.stringify(xs, null, 2)
          : undefined;
      },
    };
  };
};
