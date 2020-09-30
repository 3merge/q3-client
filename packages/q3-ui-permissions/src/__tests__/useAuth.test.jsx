import React from 'react';
import { Redirect as RouterRedirect } from '@reach/router';
import composeHook from '../useAuth';

let hook;

jest.mock('@reach/router', () => ({
  Redirect: () => null,
}));

beforeAll(async () => {
  jest
    .spyOn(React, 'useContext')
    .mockImplementation(() => ({
      state: {
        permissions: [
          {
            coll: 'foo',
            op: 'Create',
            fields: '*',
          },
          {
            coll: 'foo',
            op: 'Read',
            fields: '+(bar|quux)',
            'documentConditions': ['approved=false'],
          },
          {
            coll: 'job',
            op: 'Read',
            fields: '+(bar|quux)',
          },
          {
            coll: 'job',
            op: 'Update',
            fields: '+(bar|quux)',
            'documentConditions': ['approved=false'],
          },
        ],
      },
    }));

  hook = composeHook();
});

describe('useAuth', () => {
  describe('methods', () => {
    it('canDelete should be falsy', () =>
      expect(hook('foo').canDelete).toBeFalsy());

    it('canCreate should be falsy', () =>
      expect(hook('foo').canCreate).toBeTruthy());

    it('canSee should be truthy', () =>
      expect(hook('foo').canSee).toBeTruthy());

    it('canEdit should be falsy', () =>
      expect(hook('foo').canEdit).toBeFalsy());

    it('canCreateSub should be truthy', () =>
      expect(hook('foo').canCreateSub('bar')).toBeTruthy());

    it('canCreateSub should be truthy', () =>
      expect(hook('foo').canCreateSub('bar')).toBeTruthy());

    it('canSeeSub should be truthy', () =>
      expect(hook('foo').canSeeSub('garply')).toBeFalsy());

    it('canSeeSub should be truthy', () =>
      expect(hook('foo').canSeeSub('bar')).toBeTruthy());

    it('canDeleteSub should be truthy', () =>
      expect(hook('foo').canDeleteSub('bar')).toBeFalsy());

    it('canEditConditionally should be truthy', () => {
      const test = hook('job').canEditConditionally({
        approved: false,
      });
      expect(test).toBeTruthy();
    });
  });

  describe('components', () => {
    it('Hide should return null', () => {
      const { Hide } = hook('foo');
      const Foo = () => null;
      const wrapper = global.shallow(
        <Hide op="Update">
          <Foo />
        </Hide>,
      );
      expect(wrapper.find(Foo)).toHaveLength(0);
    });

    it('HideByField should return null', () => {
      const { HideByField } = hook('foo');
      const Foo = () => null;
      const wrapper = global.shallow(
        <HideByField op="Read" path="bar">
          <Foo />
        </HideByField>,
      );
      expect(wrapper.find(Foo)).toHaveLength(1);
    });

    it('HideByField should return null', () => {
      const { Redirect } = hook('foo');
      const Foo = () => null;
      const wrapper = global.shallow(
        <Redirect op="Delete" to="/">
          <Foo />
        </Redirect>,
      );
      expect(wrapper.find(RouterRedirect)).toHaveLength(1);
    });
  });
});
