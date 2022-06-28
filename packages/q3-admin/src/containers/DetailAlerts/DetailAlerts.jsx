import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { Box } from '@material-ui/core';
import { invoke } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import { map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import Widget from '../../components/Widget';
import { Definitions, Store } from '../state';
import useStyle from './styles';

const DetailAlerts = (props) => {
  const { collectionName } = React.useContext(Definitions);
  const { data } = React.useContext(Store);
  const { state: authState } = useAuth(collectionName);
  const { t } = useTranslation();
  const cls = useStyle();

  const alerts = invoke(
    props,
    'registerAlerts',
    data,
    authState?.profile,
    // this allows us to use vars
    t,
  );

  return (
    <Widget
      timeout={250}
      className={cls.alerts}
      title="alerts"
    >
      {map(
        alerts,
        ({ description, id, title, ...rest }) => (
          <Box key={id} mb={0.25}>
            <Alert {...rest}>
              <strong>{title}</strong>
              {' — '}
              {description}
            </Alert>
          </Box>
        ),
      )}
    </Widget>
  );
};

DetailAlerts.defaultProps = {
  registerAlerts: null,
};

DetailAlerts.propTypes = {
  registerAlerts: PropTypes.func,
};

export default React.memo(DetailAlerts);
