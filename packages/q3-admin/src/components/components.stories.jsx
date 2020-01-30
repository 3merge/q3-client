import React from 'react';
import { storiesOf } from '@storybook/react';
import AddIcon from '@material-ui/icons/Add';
import Public from './public';
import Trash from './trash';
import Upload from './upload';

const img =
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=8';

const logo =
  'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png';

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
  ));
