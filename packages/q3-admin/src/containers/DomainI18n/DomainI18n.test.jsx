import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import { Builders } from 'q3-ui-forms';
import Alert from '@material-ui/lab/Alert';
import DomainI18n from './DomainI18n';
import useDomainContext from '../../hooks/useDomainContext';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    HideByField: ({ children }) => children,
  }),
}));

jest.mock('../../hooks/useDomainContext', () => jest.fn());

describe('DomainI18n', () => {
  it('should let users know about locale change delay', () => {
    useDomainContext.mockReturnValue({
      domain: {},
    });

    const el = global.shallow(<DomainI18n />).find(Alert);
    expect(el).toHaveLength(1);
    expect(el.at(0).text()).toMatch(
      'localeEditorChangeEffect',
    );
  });

  it('should let users know which language is in effect', () => {
    useDomainContext.mockReturnValue({
      domain: {
        supportedLngs: ['en', 'fr'],
      },
    });

    const el = global.shallow(<DomainI18n />).find(Alert);
    expect(el.last().text()).toMatch('localeEditor');
    expect(el).toHaveLength(2);
  });

  it('should render an accordion form per bundle', () => {
    const update = jest.fn();
    useDomainContext.mockReturnValue({
      domain: {
        lng: 'en',
        resources: {
          en: {
            labels: {
              foo: 1,
            },
            titles: {
              foo: 1,
            },
          },
        },
      },
      update,
    });

    const el = global
      .shallow(<DomainI18n />)
      .find(Accordion);

    expect(el).toHaveLength(2);
    el.first().find(Builders.Form).props().onSubmit({
      foo: 1,
    });

    expect(update).toHaveBeenCalledWith({
      resources: {
        labels: {
          foo: 1,
        },
      },
    });
  });
});
