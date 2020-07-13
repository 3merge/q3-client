import React from 'react';
import axios from 'axios';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import { Next } from 'q3-ui-forms/lib/builders';
import DashboardReport from '../../components/DashboardReport';

export default ({ template, children, ...rest }) => {
  const [data, setData] = React.useState();
  const [query, setQuery] = React.useState(
    `?template=${template}`,
  );

  React.useEffect(() => {
    axios
      .get(`/reports${query}`)
      .then((res) => setData(res.data.data))
      .catch(() => {
        // noop
      });
  }, [query]);

  return data ? (
    <DashboardReport {...rest} data={data}>
      {(close) => (
        <EncodedUrl
          query={query}
          onSave={(values) => {
            close();
            setQuery(values);
          }}
        >
          {children}
          <Next submit />
        </EncodedUrl>
      )}
    </DashboardReport>
  ) : null;
};
