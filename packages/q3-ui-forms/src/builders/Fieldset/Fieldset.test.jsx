import React from 'react';
import Fieldset, {
  getAllMultistepFieldsetComponents,
} from './Fieldset';

describe('Fieldset', () => {
  describe('"getAllMultistepFieldsetComponents"', () => {
    it('should extract the names of all mounted fieldsets', () => {
      // eslint-disable-next-line
      const Parent = ({ children }) => {
        const steps = getAllMultistepFieldsetComponents(
          children,
        );

        return (
          <ul>
            {steps.map((step) => (
              <li id={step.name} key={step.name}>
                {step.component}
              </li>
            ))}
          </ul>
        );
      };

      const el = global.mount(
        <Parent>
          <Fieldset name="one">
            <div />
          </Fieldset>
          <div>
            <Fieldset name="two">
              <div />
            </Fieldset>
          </div>
          <div>
            <div>
              <Fieldset name="three">
                <div />
              </Fieldset>
            </div>
          </div>
          <Fieldset name="four">
            <div />
          </Fieldset>
        </Parent>,
      );

      expect(el.find('li')).toHaveLength(4);
      expect(el.find('li').first().prop('id')).toMatch(
        'one',
      );
    });
  });
});
