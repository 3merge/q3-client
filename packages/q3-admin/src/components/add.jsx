/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Create as CreateDialog } from 'q3-ui/lib/dialogs';
import Typography from '@material-ui/core/Typography';
import { useAuth } from 'q3-ui-permissions';
import Context from './state';

const Add = ({ title, children }) => {
  const { collectionName, post } = React.useContext(
    Context,
  );

  const { Hide } = useAuth(collectionName);
  const { t } = useTranslation('titles');

  return (
    <Hide op="Create">
      {children && (
        <CreateDialog
          render={(done) => (
            <>
              <Typography variant="h2">
                {t(title)}
              </Typography>
              {React.cloneElement(children, {
                isNew: true,
                collectionName,
                onSubmit: (...args) =>
                  post(...args).then(done),
              })}
            </>
          )}
        />
      )}
    </Hide>
  );
};

Add.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Add;
