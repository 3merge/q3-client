import React from 'react';
import { Router } from '@reach/router';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Header from '.';
import { FullWidthBanner } from '../banner';
import Tel from '../tel';
import Searchbar from '../searchBar';
import Toolbar from '../toolbar';

export default {
  title: 'Q3 UI|Components/Header',
  parameters: {
    component: Header,
    componentSubtitle:
      'Scroll-aware header with home-linked logo',
  },
};

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
    <Typography component="div" style={{ height: '600vh' }}>
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

export const Default = () => (
  <PageDemo>
    <Header {...defaultProps} transparent />
  </PageDemo>
);

export const Custom = () => (
  <PageDemo>
    <Header
      {...defaultProps}
      transparent
      color="primary"
      renderLeft={() => 'with love'}
      offcanvasRenderTop={<p>Top</p>}
      offcanvasRenderBottom={<Box p={2}>Bottom</Box>}
      renderRight={() => (
        <Hidden xsDown>
          <Tel hideIcon number="413-923-1233" />
          <Searchbar />
        </Hidden>
      )}
      desktopHeight={135}
      desktopWidth={295}
    >
      <Toolbar
        isLoggedIn={false}
        style={{ backgroundColor: 'blue' }}
        loginPath="/login"
        signupPath="/signup"
      >
        <Hidden smUp>
          <Tel number="413-923-1233" />
        </Hidden>
      </Toolbar>
    </Header>
  </PageDemo>
);
