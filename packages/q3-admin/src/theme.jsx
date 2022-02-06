import React from 'react';
import { compact, isFunction } from 'lodash';
import { Helmet } from 'react-helmet';
import { lighten, darken } from '@material-ui/core';

const defaultTheme = {
  brand: '3merge',
  color: '#49ec1c',
  description: 'Base installation of Q3 admin',
  logo: 'https://uploads-ssl.webflow.com/5f620c85bd4f6828cc8f637b/5f620cd411cb5e449a1db5cb_combined_logo_2-p-500.png',
  favicon:
    'https://avatars.githubusercontent.com/u/12897090?s=200&v=4',
  lng: 'en',
  supportedLngs: ['en'],
  title: 'Portal',
  resources: {
    labels: {
      'hello': 'world',
    },
  },
};

export const ThemeContext =
  React.createContext(defaultTheme);

// theFunc.constructor.name == 'AsyncFunction'?

const ThemeProvider = ({ getTheme, children }) => {
  const [ctx, setCtx] = React.useState(defaultTheme);
  const [init, setInit] = React.useState(
    !isFunction(getTheme),
  );

  const changeTheme = () => null;

  const state = React.useMemo(
    () => ({
      ...ctx,
      theme: {
        palette: {
          primary: {
            main: darken(ctx.color, 0.9),
            light: lighten(ctx.color, 0.85),
            dark: darken(ctx.color, 0.95),
            contrastText: lighten(ctx.color, 1),
          },
          secondary: {
            main: ctx.color,
            light: lighten(ctx.color, 0.5),
            dark: darken(ctx.color, 0.5),
            contrastText: lighten(ctx.color, 1),
          },
        },
      },
      changeTheme,
    }),
    [ctx],
  );

  React.useEffect(() => {
    console.log(window);

    if (isFunction(getTheme))
      getTheme()
        .then((resp) =>
          setCtx({
            ...defaultTheme,
            ...resp,
          }),
        )
        .catch(() => {
          // eslint-disable-next-line
          console.warn('Theme failed to load');
        })
        .finally(() => {
          setInit(true);
        });
  }, []);

  // should it be fully render blocking?
  // check session storage?
  return init ? (
    <ThemeContext.Provider value={state}>
      <Helmet lang={ctx.lng}>
        <link
          rel="manifest"
          href="https://gist.githubusercontent.com/MikeIbberson/d1a18dcadd42447ac6a39af300518b9b/raw/fb75928ebfe8a5e0b6f8e8bc48c58134d3fbb1e8/Q3-manifest-default.json"
        />{' '}
        <title>
          {compact([ctx.title, ctx.brand]).join(' | ')}
        </title>
        <meta
          name="description"
          content={ctx.description}
        />
        <link rel="icon" href={ctx.favicon} />
      </Helmet>
      {isFunction(children) ? children(state) : children}
    </ThemeContext.Provider>
  ) : null;
};

export default ThemeProvider;
