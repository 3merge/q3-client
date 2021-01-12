import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import Repeater from '../../src';
import articles from '../fixtures/articles';

jest.unmock('useful-state');

describe('Display', () => {
  describe('atrributes', () => {
    it('should render attributes', () => {
      const el = global.mount(
        <AuthContext.Provider
          value={{
            state: {
              init: true,
              profile: {
                role: 'Developer',
              },
              permissions: [
                {
                  role: 'Developer',
                  coll: 'testing',
                  op: 'Read',
                  fields: '*',
                },
              ],
            },
          }}
        >
          <Repeater
            name="test"
            collectionName="testing"
            edit={jest
              .fn()
              .mockImplementation(() => Promise.resolve())}
            editBulk={jest.fn()}
            create={jest.fn()}
            remove={jest
              .fn()
              .mockImplementation(() => Promise.resolve())}
            removeBulk={jest
              .fn()
              .mockReturnValue(jest.fn())}
            poll={jest.fn()}
            initialValues={{
              foo: '',
            }}
            cardProps={{
              title: 'title',
              description: 'description',
              // attributes: ['publishedDate', 'author'],
            }}
            data={[articles[0]]}
            editable={{}}
          >
            <div />
          </Repeater>
        </AuthContext.Provider>,
      );

      console.log(el.find('td').first().text());
    });

    it.todo(
      'should hide attributes based on access control',
    );

    it.todo('should allow editting of attributes');
    it.todo('should disallow editting of attributes');
  });

  describe('nesting', () => {
    it.todo('should render a collapsible row');
    it.todo('should not render a collapsible row');
  });

  describe('searching', () => {
    it.todo('should narrow results on search');
    it.todo(
      'should create dynamic title/description props',
    );
  });
});
