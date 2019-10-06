import React from 'react';
import { Components } from 'q3-ui';

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
    </Components.Section>
    {/** 
    <ComponentsSplitPanel
      size="lg"
      columnLeft={
        <>
          <Typography variant="h2" gutterBottom>
            We wanted to standardize how our clients
          </Typography>
          <Typography variant="body2" component="div">
            <p>
              We wanted to standardize how our clients
              interact with Q3 API services, namely our rest
              packages. We wanted to standardize how our
              clients interact with Q3 API services, namely
              our rest packages. We wanted to standardize
              how our clients interact with Q3 API services,
              namely our rest packages.
            </p>
            <p>
              We wanted to standardize how our clients
              interact with Q3 API services, namely our rest
              packages.
            </p>
          </Typography>
        </>
      }
      columnRight={
        <img
          src="https://images.unsplash.com/photo-1569255726446-50c4f6b6fe74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
          alt="demo"
        />
      }
    />
    <SplitPanel
      invert
      size="lg"
      columnLeft={
        <>
          <Typography variant="h2" gutterBottom>
            We wanted to standardize how our clients
          </Typography>
          <Typography variant="body2">
            We wanted to standardize how our clients
            interact with Q3 API services, namely our rest
            packages.
          </Typography>
        </>
      }
      columnRight={
        <img
          src="https://images.unsplash.com/photo-1569255726446-50c4f6b6fe74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
          alt="demo"
        />
      }
    />

    <Components.Wrapper backgroundColor="#FFF">
      <Components.Section
        title="This is a section"
        subtitle="Easy containers to create common layouts. Semantic by default!"
      >
        <SplitPanel
          columnLeft={
            <>
              <Typography variant="h2" gutterBottom>
                We wanted to standardize how our clients
              </Typography>
              <Typography variant="body2">
                We wanted to standardize how our clients
                interact with Q3 API services, namely our
                rest packages.
              </Typography>
            </>
          }
          columnRight={
            <img
              src="https://images.unsplash.com/photo-1569255726446-50c4f6b6fe74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
              alt="demo"
            />
          }
        />
        <SplitPanel
          invert
          columnLeft={
            <>
              <Typography variant="h2" gutterBottom>
                We wanted to standardize how our clients
              </Typography>
              <Typography variant="body2">
                We wanted to standardize how our clients
                interact with Q3 API services, namely our
                rest packages.
              </Typography>
            </>
          }
          columnRight={
            <img
              src="https://images.unsplash.com/photo-1569255726446-50c4f6b6fe74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
              alt="demo"
            />
          }
        />
      </Components.Section>
    </Components.Wrapper>
        */}
  </div>
);

export default IndexPage;
