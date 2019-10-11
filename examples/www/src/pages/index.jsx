import React from 'react';
import i18 from 'q3-ui/lib/i18n';
import { FullWidthBanner } from 'q3-ui/lib/banner';
import { TwoColumnPanel } from 'q3-ui/lib/panel';
import Form from 'q3-ui/lib/form';
import Input from 'q3-ui/lib/inputs';
import Section from 'q3-ui/lib/section';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

const IndexPage = () => {
  const { t } = useTranslation();

  i18.addResources('en', 'foo', {
    bar: 'heyyy',
  });

  return (
    <div>
      <FullWidthBanner
        title="Material Design Theme"
        subtitle="A custom Q3 theme for Gatsby JS"
      />

      {t('foo:bar')}

      <Section
        title="Hey"
        subtitle="Easy containers to create common layouts. Semantic by default!"
      >
        <TwoColumnPanel
          label="Microservices"
          title="Q3 Components"
          body={
            <Typography variant="subtitle1" component="div">
              <p>
                We wanted to standardize how our clients
                interact with Q3 API services, namely our
                rest packages.
              </p>
              <p>
                We wanted to standardize how our clients
                interact with Q3 API services, namely our
                rest packages.
              </p>
            </Typography>
          }
        />
        <Form>
          {() => (
            <Input name="email" required type="email" />
          )}
        </Form>
      </Section>
    </div>
  );
};

export default IndexPage;
