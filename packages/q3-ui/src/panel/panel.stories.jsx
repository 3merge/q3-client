import React from 'react';
import { storiesOf } from '@storybook/react';
import Typography from '@material-ui/core/Typography';
import {
  SplitPanel,
  TwoColumnPanel,
  ThreeColumnPanel,
} from '.';

storiesOf('Components|Panel', module)
  .add('Split', () => (
    <SplitPanel
      size="md"
      align="center"
      columnLeft={
        <Typography variant="body1" component="div">
          <p>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Suspendisse vestibulum
            fringilla sem, et pharetra tortor eleifend et.
            Proin rutrum elementum est ac laoreet. Nunc
            facilisis erat ipsum, ut sagittis augue
            facilisis eu. Vivamus condimentum vestibulum
            turpis quis porttitor. Duis cursus, arcu id
            gravida bibendum, lorem jrtor nec, convallis
            facilisis dolor.
          </p>
          <p>
            Aliquam malesuada tincidunt vulputate. Donec ac
            laoreet urna. Donec dolor sem, pharetra non
            semper id, ultrices placerat sapien. Maecenas
            varius ipsum sed ipsum est eget eros convallis,
            nec imperdiet mauris ornare. Vivamus at metus eu
            lacus condimentum ullamcorper.
          </p>
        </Typography>
      }
      columnRight={
        <Typography variant="body1" component="div">
          <p>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Suspendisse vestibulum
            fringilla sem, et pharetra tortor eleifend et.
            Proin rutrum elementum est ac laoreet. Nunc
            facilisis erat ipsum, ut sagittis augue
            facilisis eu. Vivamus condimentum vestibulum
            turpis quis porttitor. Duis cursus, arcu id
            gravida bibendum, lorem justo faucibus purus,
            dignissim hendrerit leo mi non mauris. Sed in
            tincidunt nisi, eget ullamcorper eros. Integer a
            turpis eros. Nunc sed felis vel justo consequat
            faucibus at quis neque. Aenean lectus sem,
            interdum sit amet tortor nec, convallis
            facilisis dolor.
          </p>
        </Typography>
      }
    />
  ))
  .add('Two Column', () => (
    <TwoColumnPanel
      title="This title renders in its own column on desktop"
      label="On top"
      body={
        <>
          <p>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Suspendisse vestibulum
            fringilla sem, et pharetra tortor eleifend et.
            Proin rutrum elementum est ac laoreet. Nunc
            facilisis erat ipsum, ut sagittis augue
            facilisis eu. Vivamus condimentum vestibulum
            turpis quis porttitor. Duis cursus, arcu id
            gravida bibendum, lorem justo faucibus purus,
            dignissim hendrerit leo mi non mauris.
          </p>
          <p>
            Aliquam malesuada tincidunt vulputate. Donec ac
            laoreet urna. Donec dolor sem, pharetra non
            semper id, ultrices placerat sapien.
          </p>
        </>
      }
    />
  ))
  .add('Three Column', () => (
    <ThreeColumnPanel
      title="This title renders in its own column on desktop"
      label="On top"
      columnOne={
        <>
          <Typography variant="h4" gutterBottom>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Suspendisse vestibulum
            fringilla sem, et pharetra tortor eleifend et.
            Proin rutrum elementum est ac laoreet. Nunc
            facilisis erat ipsum, ut sagittis augue
            facilisis eu.
          </Typography>
        </>
      }
      columnTwo={
        <>
          <Typography variant="h4" gutterBottom>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Suspendisse vestibulum
            fringilla sem, et pharetra tortor eleifend et.
            Proin rutrum elementum est ac laoreet. Nunc
            facilisis erat ipsum, ut sagittis augue
            facilisis eu.
          </Typography>
        </>
      }
    />
  ));
