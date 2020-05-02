import React from 'react';
import axios from 'axios';
import { i18n } from 'q3-ui-locale';
import Wrapper from '../Wrapper';

const stub = {
  theme: {},
  baseURL: 'local',
  locale: {
    en: {
      titles: {
        test: 'Foo',
      },
    },
    fr: {
      titles: {
        test: 'Bar',
      },
    },
  },
};

describe('Wrapper', () => {
  it('should register locales', () => {
    global.mount(
      <Wrapper {...stub}>
        <div />
      </Wrapper>,
    );

    expect(i18n.t('titles:test')).toMatch('Foo');

    i18n.changeLanguage('fr');
    expect(i18n.t('titles:test')).toMatch('Bar');
  });

  it('should configure base URL for axios instance', () => {
    global.mount(
      <Wrapper {...stub}>
        <div />
      </Wrapper>,
    );

    expect(axios.defaults.baseURL).toMatch(stub.baseURL);
  });
});
