import React from 'react';
import { Components } from 'q3-ui';
import Typography from '@material-ui/core/Typography';

const IndexPage = () => (
  <div>
    <Components.FullWidthBanner
      title="Material Design Theme"
      subtitle="A custom Q3 theme for Gatsby JS"
      backgroundStyle={{
        color: '#FFF',
        backgroundColor: '#252525',
        backgroundBlendMode: 'multiply',
        paddingTop: '10vh',
        paddingBottom: '10vh',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1541960071727-c531398e7494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80)',
      }}
    />
    <Components.Section
      title="This is a section"
      subtitle="Easy containers to create common layouts. Semantic by default!"
    >
      <Components.TwoColumnPanel
        label="Microservices"
        title="Q3 Components"
        body={
          <Typography variant="subtitle1" component="div">
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
          </Typography>
        }
      />
    </Components.Section>
  </div>
);

export default IndexPage;
