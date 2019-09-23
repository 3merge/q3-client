import React from 'react';
import { storiesOf } from '@storybook/react';
import Access from '.';

storiesOf('Modules|Access', module).add('Routes', () => (
  <Access
    name="Hooli"
    logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png"
    loginService={() => null}
    passwordResetService={() => null}
    verifyService={() => null}
    reverifyService={() => null}
  />
));
