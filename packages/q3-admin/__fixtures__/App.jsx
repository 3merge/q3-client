import React from 'react';
import PropTypes from 'prop-types';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import {
  useLoading,
  useTimezoneInterceptor,
} from 'q3-ui-rest';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import TvIcon from '@material-ui/icons/Tv';
import EmailEditor from 'q3-ui-emaileditor';
import QueueLogs from 'q3-ui-queuelogs';
import Authentication from './datasource/Authentication';
import Datasource from './datasource';
import Admin from '../src';
import pages from './views';

const Loading = ({ children }) => {
  useLoading();
  return children;
};

const Foo = () => <p>Custom profile view</p>;

const ExampleApp = ({ initialPath }) => {
  useTimezoneInterceptor();

  return (
    <Loading>
      <LocationProvider initialPath={initialPath}>
        <Authentication>
          <Datasource>
            <Admin
              AppProps={{
                addons: [EmailEditor, QueueLogs],
                pages,
              }}
              NavProps={{
                title: 'Demo app',
                logoSrc:
                  'https://uilogos.co/img/logomark/cod-lab.png',
              }}
              ProfileProps={{
                fields: <p>Append custom form fields!</p>,
                items: [
                  {
                    label: 'other',
                    component: Foo,
                  },
                ],
              }}
              icons={{
                entertainment: BeachAccessIcon,
                shows: TvIcon,
              }}
            />
          </Datasource>
        </Authentication>
      </LocationProvider>
    </Loading>
  );
};

ExampleApp.propTypes = {
  initialPath: PropTypes.string,
};

ExampleApp.defaultProps = {
  initialPath: '/',
};

export default ExampleApp;
