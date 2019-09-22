import React from 'react';
import { storiesOf } from '@storybook/react';
import Access from '.';

storiesOf('Modules|Access', module).add('Routes', () => (
  <Access
    name="Hooli"
    loginService={() => null}
    passwordResetService={() => null}
    verifyService={() => null}
    reverifyService={() => null}
  />
));
