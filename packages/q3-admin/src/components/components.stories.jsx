import React from 'react';
import { storiesOf } from '@storybook/react';
import AddIcon from '@material-ui/icons/Add';
import Public from './public';
import Trash from './trash';
import Upload from './upload';
import Page from './page';

const img =
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=8';

const logo =
  'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png';

const mockup = (m) => {
  m.onGet('/foo').reply(200);
};

storiesOf('Admin|Components', module)
  .add('Public', () => (
    <Public
      logo={logo}
      company="Placeholder"
      title="Public view"
      isLoggedIn={false}
      url={img}
    >
      Hey there
    </Public>
  ))
  .add('Trash', () => <Trash>Hey there</Trash>)
  .add('Upload', () => (
    <Upload
      icon={AddIcon}
      fileType="text/csv"
      name="foo"
      url="https://google.ca"
    />
  ))
  .add('Page', () => {
    const [status, setState] = React.useState();
    const [show, setShow] = React.useState(true);

    return (
      <>
        {show && (
          <Page
            collectionName="foo"
            resourceName="foo"
            resourceNameSingular="foo"
            id="1"
            onInit={() => setState('Entering')}
            onEnter={() =>
              new Promise((resolve) => {
                setState('Entered');
                resolve();
              })
            }
            onExit={() => setState('Exiting')}
          />
        )}

        <p>{status}</p>
        <button
          type="button"
          onClick={() => setShow(false)}
        >
          Unmount
        </button>
      </>
    );
  });
