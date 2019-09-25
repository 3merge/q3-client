import React from 'react';
import { Components } from 'q3-ui';
import Typography from '@material-ui/core/Typography';
import { blueGrey } from '@material-ui/core/colors';

const Content = () => (
  <Typography variant="h2">
    <p>Hey</p>
  </Typography>
);

const IndexPage = () => (
  <div style={{ paddingBottom: '10vh' }}>
    <Components.Banner
      label="Inspiration"
      title="About"
      subtitle="We wanted to standardize how our clients
            interact with Q3 API services, namely our rest
            packages."
      backgroundStyle={{
        backgroundColor: blueGrey[100],
        paddingBottom: '15vh',
      }}
    />
    <Components.Wrapper
      backgroundColor="#FFF"
      negativeMargin
    >
      <Components.TwoColumnPanel
        label="Microservices"
        title="Q3 Components"
        body={
          <>
            <p>
              We wanted to standardize how our clients
              interact with Q3 API services, namely our rest
              packages.
            </p>
            <p>
              We wanted to standardize how our clients
              interact with Q3 API services, namely our rest
              packages.
            </p>
          </>
        }
      />
    </Components.Wrapper>
    <Components.SplitPanel
      columnLeft={
        <>
          <p>
            We wanted to standardize how our clients
            interact with Q3 API services, namely our rest
            packages.
          </p>
          <p>
            We wanted to standardize how our clients
            interact with Q3 API services, namely our rest
            packages.
          </p>
        </>
      }
      columnRight={
        <>
          <p>
            We wanted to standardize how our clients
            interact with Q3 API services, namely our rest
            packages.
          </p>
          <p>
            We wanted to standardize how our clients
            interact with Q3 API services, namely our rest
            packages.
          </p>
        </>
      }
    />
    <Components.SplitPanel
      columnLeft={<Content />}
      columnRight={
        <img
          src="https://images.unsplash.com/photo-1569255726446-50c4f6b6fe74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
          alt="demo"
        />
      }
    />
  </div>
);

export default IndexPage;
