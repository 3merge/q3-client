import React from 'react';
import i18 from 'q3-ui/lib/i18n';
import { ResourceCard } from 'q3-ui/lib/card';
import { FullWidthBanner } from 'q3-ui/lib/banner';
import { TwoColumnPanel } from 'q3-ui/lib/panel';
import Section from 'q3-ui/lib/section';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

i18.addResources('en', 'titles', {
  title: 'Component libraries for rapid PWA development',
});

i18.addResources('en', 'descriptions', {
  leader: 'Built on Express, Mongo and Material UI',
});

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <FullWidthBanner
        title={t('titles:title')}
        subtitle={t('descriptions:leader')}
      />

      {t('foo:bar')}

      <Container>
        <Grid container spacing={1}>
          <ResourceCard
            to="/"
            title="API Framework"
            description="REST API framework that automates controller validation and model routing"
            buttonText="Repo"
            secondaryTo="/"
            secondaryButtonText="Download"
          />
          <ResourceCard
            to="/"
            title="API Framework"
            description="REST API framework that automates controller validation and model routing"
            buttonText="Repo"
            secondaryTo="/"
            secondaryButtonText="Download"
          />
          <ResourceCard
            to="/"
            title="API Framework"
            description="REST API framework that automates controller validation and model routing"
            buttonText="Repo"
            secondaryTo="/"
            secondaryButtonText="Download"
          />
        </Grid>
      </Container>

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
      </Section>
    </div>
  );
};

export default IndexPage;
