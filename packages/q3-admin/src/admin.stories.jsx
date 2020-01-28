import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import { FeaturedPhotoBanner } from 'q3-ui/lib/banner';
import Statistic from 'q3-ui/lib/statistic';
import {
  Form,
  Field,
  Multistep,
  Repeater,
} from 'q3-ui-forms/lib/builders';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {
  TableRow,
  TableBadge,
  TableProgress,
  TableCheck,
} from 'q3-ui-datatables';
import Power from '@material-ui/icons/Power';
import Edit from '@material-ui/icons/Edit';
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
  FilterBox,
} from './components';
import { useUpload } from './helpers';
import fixtures from './__fixtures__';

const img =
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=8';

const logo =
  'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png';

const Home = () => (
  <div>
    <FeaturedPhotoBanner
      style={{ backgroundColor: '#FFF' }}
    >
      <Typography variant="h1">
        Welcome to the example app
      </Typography>
    </FeaturedPhotoBanner>
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Grid container spacing={1}>
        <Statistic text="hey" difference={12} num={40} />
      </Grid>
    </Container>
  </div>
);

const Writers = (props) => (
  <Page {...props}>
    <List>
      <DisplayItem include="name" />
    </List>
  </Page>
);

const Animators = (props) => (
  <Page {...props}>
    <List>
      <DisplayItem include="name" />
    </List>
  </Page>
);

const Characters = (props) => (
  <Page {...props}>
    <FilterBox>
      <Header>
        <Search
          intercept={(items) =>
            items.map((item) => ({
              ...item,
              url: `/characters/${item.id}`,
            }))
          }
        >
          <Field name="locations" type="select" />
        </Search>
        <Add title="addCharacter">
          <p>My form</p>
        </Add>
      </Header>
      <List
        fixedWidths={[
          '100%',
          '100%',
          '85px',
          '96px',
          '75px',
        ]}
      >
        {(rows = []) =>
          rows.map((row) => (
            <TableRow
              id={row.id}
              columns={{
                name: row.name,
                description: row.origin.name,
                photo: row.image,
                location: row.location.name,
                status: (
                  <TableBadge
                    status={row.status}
                    color={
                      row.status === 'Alive'
                        ? 'success'
                        : 'primary'
                    }
                  />
                ),
                popularity: (
                  <TableProgress
                    value={row.episode.length}
                  />
                ),
                human: (
                  <TableCheck
                    show={row.species === 'Human'}
                  />
                ),
              }}
              rowToolbar={[
                {
                  onClick: () => alert('Test'),
                  label: 'Hey',
                },
              ]}
            />
          ))
        }
      </List>
    </FilterBox>
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
        </Form>
        <Form name="Other">
          <Field name="url" under="episodes" type="url" />
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
    <Header titleProp="name">
      <Add title="addCharacter">
        <p>My form</p>
      </Add>
    </Header>
    <Detail
      trash
      notes
      history
      files
      filepath={Promise.resolve('<p>Hey</p>')}
    >
      <General name="general" />
      <Episode name="episodes" />
    </Detail>
  </Page>
);

const pages = [
  {
    home: true,
    component: Home,
  },
  {
    index: true,
    collectionName: 'characters',
    resourceName: 'characters',
    resourceNameSingular: 'character',
    component: Characters,
    group: 'popular',
    subMenu: [
      {
        icon: Power,
        label: 'All',
        to: '/characters',
      },
      {
        icon: Power,
        label: 'Humans',
        to: '/characters?status=humna',
      },
    ],
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
    collectionName: 'writers',
    resourceName: 'writers',
    resourceNameSingular: 'writer',
    group: 'staff',
    component: Writers,
    icon: Edit,
  },
  {
    index: true,
    collectionName: 'animators',
    resourceName: 'animators',
    resourceNameSingular: 'animator',
    group: 'staff',
    component: Animators,
    icon: Edit,
  },
];

const FullApp = () => (
  <MockApi define={fixtures(true)}>
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
);

const PublicViews = () => (
  <MockApi define={fixtures()}>
    <App>
      <ApplicationGate
        url={img}
        logo={logo}
        companyName="Hooli"
        pages={{}}
      />
    </App>
  </MockApi>
);

storiesOf('Admin|App/Public', module)
  .add('Login', PublicViews, {
    router: '/',
  })
  .add('Password reset', PublicViews, {
    router: '/password-reset',
  })
  .add('Verify', PublicViews, {
    router: '/verify',
  })
  .add('Reverify', PublicViews, {
    router: '/reverify',
  });

storiesOf('Admin|App/Private', module)
  .add('Home', FullApp, {
    router: '/',
  })
  .add('Characters', FullApp, {
    router: '/characters',
  })
  .add('Character general', FullApp, {
    router: '/characters/1',
  })
  .add('Character trash', FullApp, {
    router: '/characters/1/trash',
  })
  .add('Character uploads', FullApp, {
    router: '/characters/1/uploads',
  })

  .add('Character notes', FullApp, {
    router: '/characters/1/thread',
  })
  .add('Writers', FullApp, {
    router: '/writers',
  })
  .add('Animators', FullApp, {
    router: '/animators',
  });
