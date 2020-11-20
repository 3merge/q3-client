import React from 'react';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { Builders } from 'q3-ui-forms';
import Box from '@material-ui/core/Box';
import Datasource from '.';
import Authentication from './Authentication';
import Collection from '../../src/containers/collection';
import CollectionDetail from '../../src/containers/CollectionDetail';
import Socket from '../../src/containers/Socket';
import App from '../../src/components/app';
import { Loading } from '../App';

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

export const TemplateDetail = ({ component: Template }) => (
  <Loading>
    <LocationProvider initialPath="/shows/1">
      <Authentication>
        <Datasource>
          <Socket>
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
          </Socket>
        </Datasource>
      </Authentication>
    </LocationProvider>
  </Loading>
);
