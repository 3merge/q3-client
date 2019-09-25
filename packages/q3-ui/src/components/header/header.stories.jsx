import React from 'react';
import { Router } from '@reach/router';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Header from '.';
import { FullWidthBanner } from '../banner';

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
      backgroundStyle={{
        backgroundColor: 'blue',
        color: '#FFF',
      }}
    />
    <Router>
      <Foo path="foo" />
      <Bar path="bar" />
      <Qux path="qux" />
    </Router>
    <Typography>
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
      <Header {...defaultProps} color="#FFF" />
    </PageDemo>
  ))
  .add('With search', () => (
    <PageDemo>
      <Header
        search
        searchVisible
        menuPosition="left"
        {...defaultProps}
      />
    </PageDemo>
  ))
  .add('With telephone', () => (
    <PageDemo>
      <Header
        search
        tel="416-999-2131"
        menuPosition="left"
        {...defaultProps}
      />
    </PageDemo>
  ))
  .add('With custom renders', () => (
    <PageDemo>
      <Header
        renderLeft={() => 'with love'}
        renderRight={() => (
          <Button
            variant="outlined"
            color="primary"
            size="large"
          >
            Baz!
          </Button>
        )}
        {...defaultProps}
      />
    </PageDemo>
  ));
