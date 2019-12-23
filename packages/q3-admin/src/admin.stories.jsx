import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import { FeaturedPhotoBanner } from 'q3-ui/lib/banner';
import {
  Form,
  Field,
  Multistep,
  Next,
  Back,
  Repeater,
} from 'q3-ui-forms/lib/builders';
import Typography from '@material-ui/core/Typography';
import Power from '@material-ui/icons/Power';
import Category from '@material-ui/icons/Category';
import App, { ApplicationGate } from '.';
import {
  DisplayItem,
  List,
  Header,
  Page,
  Detail,
  SubDetail,
  Search,
  Add,
} from './components';
import { useUpload } from './helpers';
import characters from './__fixtures__/characters.json';
import episodes from './__fixtures__/episodes.json';

const img =
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=8';

const logo =
  'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png';

const Characters = (props) => (
  <Page {...props}>
    <Header>
      <Search
        intercept={(items) =>
          items.map((item) => ({
            ...item,
            url: `/characters/${item.id}`,
          }))
        }
      >
        <DisplayItem include="location" />
        <DisplayItem include="location" />
      </Search>
      <Add title="addCharacter">
        <p>My form</p>
      </Add>
    </Header>
    <List>
      <DisplayItem include={['name', 'species', 'image']} />
      <DisplayItem include="location.name" />
    </List>
  </Page>
);

const Episode = () => (
  <SubDetail root="episodes">
    <Repeater
      primary={(item) => item.name}
      secondary={(item) => item.air_date}
      initialValues={{
        name: '',
      }}
    >
      <Multistep>
        <Form name="Important">
          <Field
            name="name"
            under="episodes"
            type="text"
            required
          />
          <Field
            name="air_date"
            under="episodes"
            type="date"
            required
          />
          <Back />
          <Next />
        </Form>
        <Form name="Other">
          <Field name="url" under="episodes" type="url" />
          <Back />
          <Next />
        </Form>
      </Multistep>
    </Repeater>
  </SubDetail>
);

const General = ({ state, id, collectionName }) => (
  <Form
    collectionName={collectionName}
    initialValues={state.character}
    onSubmit={state.patch()}
  >
    <Field name="name" type="text" required />
    <Field name="location.name" type="text" />
    <Field
      name="species"
      type="select"
      options={[
        { value: 'Human', label: 'Human' },
        { value: 'Alien', label: 'Alien' },
      ]}
    />
  </Form>
);

const Character = (props) => (
  <Page {...props}>
    <Header titleProp="name" />
    <Detail trash notes history files>
      <General />
      <Episode />
    </Detail>
  </Page>
);

const pages = [
  {
    home: true,
    component: () => (
      <div>
        <FeaturedPhotoBanner
          style={{ backgroundColor: '#FFF' }}
        >
          <Typography variant="h1">
            Welcome to the example app
          </Typography>
        </FeaturedPhotoBanner>
      </div>
    ),
  },
  {
    index: true,
    collectionName: 'characters',
    resourceName: 'characters',
    resourceNameSingular: 'character',
    component: Characters,
    group: 'popular',
    icon: Power,
  },
  {
    id: true,
    collectionName: 'characters',
    resourceName: 'characters',
    resourceNameSingular: 'character',
    component: Character,
    group: 'popular',
  },
  {
    index: true,
    collectionName: 'characters',
    resourceName: 'episoders',
    resourceNameSingular: 'episoder',
    component: Category,
    group: 'popular',
  },
];

const mockup = (asLoggedIn) => (m) => {
  if (asLoggedIn) {
    m.onGet('/profile').reply(200, {
      profile: {
        id: 1,
        firstName: 'Mike',
      },
      permissions: [
        {
          coll: 'characters',
          op: 'Read',
          fields: '*, !name',
        },
        {
          coll: 'characters',
          op: 'Update',
          fields: '*',
        },
        {
          coll: 'episodes',
          op: 'Read',
          fields: '*, !name',
        },
        {
          coll: 'characters',
          op: 'Create',
          fields: 'episodes*',
        },
      ],
    });
  }

  m.onGet(/\/characters\/\d+\/episodes/).reply(200, {
    episodes,
  });

  m.onGet(/\/characters\/\d+/).reply((config) => {
    const split = config.url.split('/');
    const id = split[split.length - 1];

    return [
      200,
      {
        character: characters.find(
          (c) => String(c.id) === String(id),
        ),
      },
    ];
  });

  m.onGet(/characters/).reply(200, {
    characters,
  });
};

storiesOf('Admin|App', module)
  .add(
    'Logged out',
    () => (
      <MockApi define={mockup()}>
        <App>
          <ApplicationGate
            url={img}
            logo={logo}
            companyName="Hooli"
            pages={{}}
          />
        </App>
      </MockApi>
    ),
    {
      router: '/',
    },
  )
  .add(
    'Logged in',
    () => (
      <MockApi define={mockup(true)}>
        <App>
          <ApplicationGate
            url={img}
            logo={logo}
            companyName="Hooli"
            pages={pages}
            popoutMenuItems={[
              useUpload({
                endpoint: '/',
                label: 'uploadFile',
                name: 'File',
              }),
            ]}
          />
        </App>
      </MockApi>
    ),
    {
      router: '/',
    },
  );
