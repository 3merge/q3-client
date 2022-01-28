import React from 'react';
import { Context } from 'q3-ui-forms';
import { useNavigate, useLocation } from '@reach/router';
import { useQueryParams } from 'q3-ui-queryparams';
import { browser } from 'q3-ui-helpers';
import { first, get, split } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { FieldToQueryBuilder } from '../../helpers';

const useActions = (data, done) => {
  const { values } = React.useContext(Context.BuilderState);
  const { onReset } = React.useContext(
    Context.DispatcherState,
  );

  const { encode } = useQueryParams();
  const navigate = useNavigate();
  const l = useLocation();
  const { t } = useTranslation('descriptions');

  return Object.entries({
    clear() {
      return navigate(`${l.pathname}?`);
    },

    copy() {
      const url = first(
        split(get(window, 'location.href'), '?'),
      );

      browser.copyToClipboard(
        url + encode(FieldToQueryBuilder(data)(values)),
      );

      // eslint-disable-next-line
      return alert(t('copiedWorkingFilter'));
    },

    reset() {
      return onReset();
    },
  }).reduce((acc, [key, value]) => {
    acc[key] = (e) => {
      e.preventDefault();
      return Promise.resolve(value()).then(done);
    };

    return acc;
  }, {});
};

export default useActions;
