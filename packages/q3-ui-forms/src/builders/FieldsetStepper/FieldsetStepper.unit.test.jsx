import React from 'react';
import {
  getFieldNames,
  checkFieldComponentsForErrors,
} from './FieldsetStepper';
import Field from '../Field/Field';

const FIRST = 'firstname';
const MIDDLE = 'middlename';
const LAST = 'lastname';

describe('FieldsetStepper', () => {
  describe('"getFieldNames"', () => {
    it('should fetch all Field component names', () => {
      const Renderer = ({ children }) => {
        const names = getFieldNames(children);
        expect(names).toHaveLength(3);
        expect(names[0]).toMatch(FIRST);
        expect(names[1]).toMatch(MIDDLE);
        expect(names[2]).toMatch(LAST);
        return null;
      };

      global.shallow(
        <Renderer>
          <Field name={FIRST} />
          <div>
            <Field name={MIDDLE} />
          </div>
          <div>
            <div>
              <Field name={LAST} />
            </div>
          </div>
        </Renderer>,
      );
    });
  });

  describe('"checkFieldComponentsForErrors"', () => {
    it('should match errors to component names', () => {
      const Renderer = ({ children }) => {
        const hasError = checkFieldComponentsForErrors(
          { props: { children } },
          {
            [MIDDLE]: 'Is required',
          },
        );

        expect(hasError).toBeTruthy();
        return null;
      };

      global.shallow(
        <Renderer>
          <Field name={FIRST} />
          <Field name={MIDDLE} />
          <Field name={LAST} />
        </Renderer>,
      );
    });
  });
});
