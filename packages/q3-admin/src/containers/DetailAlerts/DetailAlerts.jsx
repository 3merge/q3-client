import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { invoke } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import { map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { Definitions, Store } from '../state';

const DetailAlerts = (props) => {
  const { collectionName } = React.useContext(Definitions);
  const { data } = React.useContext(Store);
  const { state: authState } = useAuth(collectionName);
  const { t } = useTranslation();

  return map(
    invoke(
      props,
      'registerAlerts',
      data,
      authState?.profile,
      // this allows us to use vars
      t,
    ),
    ({ description, id, title, ...rest }) => (
      <Alert key={id} {...rest}>
        <strong>{title}</strong>
        {' — '}
        {description}
      </Alert>
    ),
  );
};

DetailAlerts.defaultProps = {
  registerAlerts: null,
};

DetailAlerts.propTypes = {
  registerAlerts: PropTypes.func,
};

export default React.memo(DetailAlerts);
