import React from 'react';
import { Router } from '@reach/router';
import { storiesOf } from '@storybook/react';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Header from '.';
import { FullWidthBanner } from '../banner';
import Tel from '../tel';
import Searchbar from '../searchBar';
import Toolbar from '../toolbar';

const defaultProps = {
  logoImgSrc:
    'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png',
  customLogoHeight: 'auto',
  menuItems: [
    {
      to: 'foo',
      label: 'Foo',
      visible: true,
    },
    {
      to: 'bar',
      label: 'Bar',
      visible: true,
    },
    {
      to: 'qux',
      label: 'Qux',
      visible: true,
    },
  ],
};

const Foo = () => 'Foo';
const Bar = () => 'Bar';
const Qux = () => 'Qux';

// eslint-disable-next-line
const PageDemo = ({ children }) => (
  <>
    {children}
    <FullWidthBanner
      title="Example"
      negativeMargin
      style={{
        backgroundColor: 'lightblue',
      }}
    />
    <Router>
      <Foo path="foo" />
      <Bar path="bar" />
      <Qux path="qux" />
    </Router>
    <Typography component="div">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed ut lorem et leo tincidunt commodo.
        Pellentesque mollis lectus non auctor aliquet.
        Maecenas consequat tempus convallis. Aenean gravida
        lorem id est ullamcorper tempor. Nulla placerat,
        tortor ut placerat dapibus, felis sapien aliquam
        lectus, vitae condimentum odio tortor at mi. Donec
        feugiat magna vel malesuada sollicitudin. Nam
        ullamcorper vehicula maximus. Pellentesque volutpat
        metus eu aliquam porttitor. Integer efficitur risus
        quis aliquet euismod. Aenean rutrum tellus sit amet
        lectus bibendum, quis ultrices nisi ultrices.
        Praesent tempus laoreet eros ut fringilla.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed ut lorem et leo tincidunt commodo.
        Pellentesque mollis lectus non auctor aliquet.
        Maecenas consequat tempus convallis. Aenean gravida
        lorem id est ullamcorper tempor. Nulla placerat,
        tortor ut placerat dapibus, felis sapien aliquam
        lectus, vitae condimentum odio tortor at mi. Donec
        feugiat magna vel malesuada sollicitudin. Nam
        ullamcorper vehicula maximus. Pellentesque volutpat
        metus eu aliquam porttitor. Integer efficitur risus
        quis aliquet euismod. Aenean rutrum tellus sit amet
        lectus bibendum, quis ultrices nisi ultrices.
        Praesent tempus laoreet eros ut fringilla.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed ut lorem et leo tincidunt commodo.
        Pellentesque mollis lectus non auctor aliquet.
        Maecenas consequat tempus convallis. Aenean gravida
        lorem id est ullamcorper tempor. Nulla placerat,
        tortor ut placerat dapibus, felis sapien aliquam
        lectus, vitae condimentum odio tortor at mi. Donec
        feugiat magna vel malesuada sollicitudin. Nam
        ullamcorper vehicula maximus. Pellentesque volutpat
        metus eu aliquam porttitor. Integer efficitur risus
        quis aliquet euismod. Aenean rutrum tellus sit amet
        lectus bibendum, quis ultrices nisi ultrices.
        Praesent tempus laoreet eros ut fringilla.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed ut lorem et leo tincidunt commodo.
        Pellentesque mollis lectus non auctor aliquet.
        Maecenas consequat tempus convallis. Aenean gravida
        lorem id est ullamcorper tempor. Nulla placerat,
        tortor ut placerat dapibus, felis sapien aliquam
        lectus, vitae condimentum odio tortor at mi. Donec
        feugiat magna vel malesuada sollicitudin. Nam
        ullamcorper vehicula maximus. Pellentesque volutpat
        metus eu aliquam porttitor. Integer efficitur risus
        quis aliquet euismod. Aenean rutrum tellus sit amet
        lectus bibendum, quis ultrices nisi ultrices.
        Praesent tempus laoreet eros ut fringilla.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed ut lorem et leo tincidunt commodo.
        Pellentesque mollis lectus non auctor aliquet.
        Maecenas consequat tempus convallis. Aenean gravida
        lorem id est ullamcorper tempor. Nulla placerat,
        tortor ut placerat dapibus, felis sapien aliquam
        lectus, vitae condimentum odio tortor at mi. Donec
        feugiat magna vel malesuada sollicitudin. Nam
        ullamcorper vehicula maximus. Pellentesque volutpat
        metus eu aliquam porttitor. Integer efficitur risus
        quis aliquet euismod. Aenean rutrum tellus sit amet
        lectus bibendum, quis ultrices nisi ultrices.
        Praesent tempus laoreet eros ut fringilla.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed ut lorem et leo tincidunt commodo.
        Pellentesque mollis lectus non auctor aliquet.
        Maecenas consequat tempus convallis. Aenean gravida
        lorem id est ullamcorper tempor. Nulla placerat,
        tortor ut placerat dapibus, felis sapien aliquam
        lectus, vitae condimentum odio tortor at mi. Donec
        feugiat magna vel malesuada sollicitudin. Nam
        ullamcorper vehicula maximus. Pellentesque volutpat
        metus eu aliquam porttitor. Integer efficitur risus
        quis aliquet euismod. Aenean rutrum tellus sit amet
        lectus bibendum, quis ultrices nisi ultrices.
        Praesent tempus laoreet eros ut fringilla.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed ut lorem et leo tincidunt commodo.
        Pellentesque mollis lectus non auctor aliquet.
        Maecenas consequat tempus convallis. Aenean gravida
        lorem id est ullamcorper tempor. Nulla placerat,
        tortor ut placerat dapibus, felis sapien aliquam
        lectus, vitae condimentum odio tortor at mi. Donec
        feugiat magna vel malesuada sollicitudin. Nam
        ullamcorper vehicula maximus. Pellentesque volutpat
        metus eu aliquam porttitor. Integer efficitur risus
        quis aliquet euismod. Aenean rutrum tellus sit amet
        lectus bibendum, quis ultrices nisi ultrices.
        Praesent tempus laoreet eros ut fringilla.
      </p>
    </Typography>
  </>
);

storiesOf('Components|Header', module)
  .add('Default', () => (
    <PageDemo>
      <Header {...defaultProps} />
    </PageDemo>
  ))
  .add('With custom renders', () => (
    <PageDemo>
      <Header
        {...defaultProps}
        transparent
        renderLeft={() => 'with love'}
        renderRight={() => (
          <Hidden xsDown>
            <Tel number="413-923-1233" />
            <Searchbar />
          </Hidden>
        )}
      >
        <Toolbar />
      </Header>
    </PageDemo>
  ));
