import React from 'react';
import PropTypes from 'prop-types';
import { FullWidthBanner } from 'q3-ui/lib/banner';
import Steps from 'q3-ui/lib/steps';
import Wrapper from 'q3-ui/lib/wrapper';
import Container from '@material-ui/core/Container';
import PinDrop from '@material-ui/icons/PinDrop';
import Publish from '@material-ui/icons/Publish';
import Payment from '@material-ui/icons/Payment';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';

const CheckoutLayout = ({ children }) => (
  <>
    <FullWidthBanner title="Checkout">
      <Steps
        steps={[
          {
            label: 'Shipping',
            to: '/checkout',
            icon: PinDrop,
          },
          {
            label: 'Uploads',
            to: '/uploads',
            icon: Publish,
          },
          {
            label: 'Payment',
            to: '/payment',
            icon: Payment,
          },
          {
            label: 'Summary',
            to: '/summary',
            icon: AssignmentTurnedIn,
          },
        ]}
      />
    </FullWidthBanner>
    <Wrapper fullWidth backgroundColor="#FFF">
      <Container component="main">{children}</Container>
    </Wrapper>
  </>
);

CheckoutLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CheckoutLayout;
