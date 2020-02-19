import React from 'react';
import {
  Link,
  Router,
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';

import { LocationDebugger } from '../../components/debugger';
import Page from '.';

export default {
  title: 'Q3 Admin|Containers/Page',
  parameters: {
    component: Page,
    componentSubtitle:
      'Container for defining state and permission scopes across a resource',
  },
};

const PageOne = (props) => (
  <Page
    {...props}
    collectionName="foo"
    resourceName="foo"
    resourceNameSingular="foos"
  >
    Page one
    {props.withLink && <Link to="/two">Next</Link>}
  </Page>
);

const PageTwo = (props) => (
  <Page
    {...props}
    collectionName="bar"
    resourceName="bar"
    resourceNameSingular="bars"
  >
    Page two
    <Link to="/one">Back</Link>
  </Page>
);

export const Default = () => {
  const [init, setInit] = React.useState(false);
  const [enter, setEnter] = React.useState(false);
  const [exit, setExit] = React.useState(false);
  const [mounted, setMount] = React.useState(true);

  const renderYesOrNo = (v) => (v ? 'Yes' : 'No');

  return (
    <div>
      <ul>
        <li>Init fired: {renderYesOrNo(init)}</li>
        <li>Enter fired: {renderYesOrNo(enter)}</li>
        <li>Exit fired: {renderYesOrNo(exit)}</li>
        <li>
          <button
            onClick={() => setMount(false)}
            type="button"
          >
            Unmount
          </button>
        </li>
      </ul>
      {mounted && (
        <Router>
          <PageOne
            default
            onInit={() => setInit(true)}
            onEnter={() =>
              new Promise((resolve) =>
                setTimeout(() => {
                  setEnter(true);
                  resolve();
                }, 1500),
              )
            }
            onExit={() => setExit(true)}
          />
        </Router>
      )}
    </div>
  );
};

export const PageNavigation = () => {
  const source = createMemorySource('/one');
  const history = createHistory(source);

  return (
    <LocationProvider history={history}>
      <LocationDebugger />
      <Router>
        <PageOne withLink path="one" />
        <PageTwo path="two" />
      </Router>
    </LocationProvider>
  );
};
