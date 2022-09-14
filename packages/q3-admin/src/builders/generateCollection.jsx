import React from 'react';
import Page from '../containers/page';
import Collection from '../containers/collection';
import Article from '../components/Article';
import { useUnsavedChanges } from '../hooks';
import withCollectionUi from '../helpers/withCollectionUi';
import withSystemSettings from '../helpers/withSystemSettings';

export const getCollectionInformation = ({
  resourceName,
  resourceNameSingular,
  collectionName,
  ...rest
}) => ({
  resourceName,
  resourceNameSingular,
  collectionName: collectionName || resourceName,
  ...rest,
});

export default ({
  icon,
  PageDetail,
  PageDetailProps,
  PageList,
  PageListProps,
  Toolbar,
  ...etc
}) => [
  {
    id: true,
    ...getCollectionInformation(etc),
    component: (props) => {
      // integrated with q3-ui-forms
      useUnsavedChanges();

      return (
        <Collection id {...props}>
          <Page id {...props} {...PageDetailProps}>
            <Toolbar />
            <PageDetail />
          </Page>
        </Collection>
      );
    },
  },
  {
    icon,
    index: true,
    ...getCollectionInformation(etc),
    component: withSystemSettings(
      withCollectionUi(
        (props) => (
          <Collection index {...props}>
            <Article>
              <Page index {...props}>
                <Toolbar />
                <PageList
                  {...props}
                  ui={props?.ui}
                  uis={props?.uis}
                />
              </Page>
            </Article>
          </Collection>
        ),
        PageListProps,
      ),
    ),
  },
];
