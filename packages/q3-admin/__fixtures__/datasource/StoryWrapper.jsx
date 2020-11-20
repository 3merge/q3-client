import React from 'react';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { Builders } from 'q3-ui-forms';
import Box from '@material-ui/core/Box';
import Datasource from '.';
import Authentication from './Authentication';
import Collection from '../../src/containers/collection';
import CollectionDetail from '../../src/containers/CollectionDetail';
import CollectionList from '../../src/containers/CollectionList';
import Socket from '../../src/containers/Socket';
import App from '../../src/components/app';
import { Loading } from '../App';
import * as Templates from '../../src/templates';

const SampleForm = () => (
  <Box my={2}>
    <Builders.Form>
      <Builders.Field name="firstName" type="text" />
      <Builders.Field name="lastName" type="text" />
      <Builders.Field name="email" type="email" />
      <Builders.Field name="tel" type="tel" />
    </Builders.Form>
  </Box>
);

const SampleApp = ({ component: Template }) => (
  <App
    redirectPathForUnauthorizedUsers="/login"
    pages={[
      {
        id: true,
        collectionName: 'shows',
        resourceName: 'shows',
        resourceNameSingular: 'show',
        component: () => {
          const General = () => <SampleForm />;

          return (
            <Collection
              id={1}
              resourceName="shows"
              collectionName="shows"
              resourceNameSingular="show"
            >
              <CollectionDetail>
                <Template>
                  <General name="general" />
                </Template>
              </CollectionDetail>
            </Collection>
          );
        },
      },
    ]}
  />
);

const SampleListApp = ({ component: Template }) => (
  <App
    redirectPathForUnauthorizedUsers="/login"
    pages={[
      {
        index: true,
        collectionName: 'shows',
        resourceName: 'shows',
        resourceNameSingular: 'show',
        component: () => (
          <Collection
            resourceName="shows"
            collectionName="shows"
            resourceNameSingular="show"
          >
            <CollectionList>
              <Template />
            </CollectionList>
          </Collection>
        ),
      },
    ]}
  />
);

const TemplateWrapper = ({ initialPath, children }) => (
  <Loading>
    <LocationProvider initialPath={initialPath}>
      <Authentication>
        <Datasource>
          <Socket>{children}</Socket>
        </Datasource>
      </Authentication>
    </LocationProvider>
  </Loading>
);

export const TemplateDetailCollapse = (props) => (
  <TemplateWrapper initialPath="/shows/1">
    <Templates.App.Collapse>
      <SampleApp {...props} />
    </Templates.App.Collapse>
  </TemplateWrapper>
);

export const TemplateDetailStack = (props) => (
  <TemplateWrapper initialPath="/shows/1">
    <Templates.App.Stack>
      <SampleApp {...props} />
    </Templates.App.Stack>
  </TemplateWrapper>
);

export const TemplateDetailMultiColumn = (props) => (
  <TemplateWrapper initialPath="/shows/1">
    <Templates.App.MultiColumn>
      <SampleApp {...props} />
    </Templates.App.MultiColumn>
  </TemplateWrapper>
);

export const TemplateDetail = (props) => (
  <TemplateWrapper initialPath="/shows/1">
    <Templates.App.Collapse>
      <SampleApp {...props} />
    </Templates.App.Collapse>
  </TemplateWrapper>
);

export const TemplateListCollapse = (props) => (
  <TemplateWrapper initialPath="/shows">
    <Templates.App.Collapse>
      <SampleListApp {...props} />
    </Templates.App.Collapse>
  </TemplateWrapper>
);

export const TemplateListStack = (props) => (
  <TemplateWrapper initialPath="/shows">
    <Templates.App.Stack>
      <SampleListApp {...props} />
    </Templates.App.Stack>
  </TemplateWrapper>
);

export const TemplateListMultiColumn = (props) => (
  <TemplateWrapper initialPath="/shows">
    <Templates.App.MultiColumn>
      <SampleListApp {...props} />
    </Templates.App.MultiColumn>
  </TemplateWrapper>
);
