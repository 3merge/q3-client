import React from 'react';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import Comparision from 'comparisons';
import { array, object } from 'q3-ui-helpers';
import { Options } from '../containers/state';

export default (componentProps = {}) => {
  const options = React.useContext(Options);

  const role = get(
    React.useContext(AuthContext),
    'state.profile.role',
  );

  const can = React.useCallback(
    (feature, context) => {
      const input = componentProps[feature];
      if (!input || !options || options.all) return input;
      const rules = get(options, role, {});

      if (
        rules.all ||
        rules[feature] === true ||
        (array.hasLength(rules[feature]) &&
          object.hasKeys(context) &&
          new Comparision(rules[feature]).eval(context))
      )
        return input;

      return null;
    },
    [componentProps, role],
  );

  const check = React.useCallback(
    (feature, el, context) => {
      if (!el || !options || options.all) return el;
      const rules = get(options, role, {});

      if (
        rules.all ||
        rules[feature] === true ||
        (array.hasLength(rules[feature]) &&
          object.hasKeys(context) &&
          new Comparision(rules[feature]).eval(context))
      )
        return el;

      return null;
    },
    [componentProps, role],
  );

  return { can, check };
};
