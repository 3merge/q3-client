import React from 'react';
import axios from 'axios';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import { Next } from 'q3-ui-forms/lib/builders';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import DashboardReport from '../../components/DashboardReport';

export default ({ template, children, ...rest }) => {
  const initialQueryValue = `?template=${template}`;
  const [data, setData] = React.useState();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('descriptions');

  const [query, setQuery] = React.useState(
    initialQueryValue,
  );

  const promptDownload = React.useCallback(
    () =>
      axios
        .post(`/reports${query}`)
        .then(() =>
          enqueueSnackbar(t('reportStarted'), {
            variant: 'info',
          }),
        )
        .catch(() =>
          enqueueSnackbar(t('reportFailed'), {
            variant: 'error',
          }),
        ),
    [query],
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
    <DashboardReport
      {...rest}
      data={data}
      onDownload={promptDownload}
    >
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
