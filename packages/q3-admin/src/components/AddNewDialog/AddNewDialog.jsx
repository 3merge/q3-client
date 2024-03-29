import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, capitalize } from 'lodash';
import Dialog from 'q3-ui-dialog';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import { useTranslation } from 'q3-ui-locale';
import ButtonWithIcon from '../ButtonWithIcon';
import { Definitions } from '../../containers/state';
import useStyle from './styles';

const AddNewDialog = ({ children }) => {
  const { collectionName } = React.useContext(Definitions);
  const { t } = useTranslation('labels');
  const specializedKey = `create${capitalize(
    collectionName,
  )}`;

  const label = t(specializedKey);
  const cls = useStyle();

  return isFunction(children) ? (
    <Dialog
      renderContent={children}
      renderTrigger={(onClick) => (
        <Box>
          <Hidden mdDown>
            <Box mr={3}>
              <Button
                id="list-action--create"
                color="secondary"
                onClick={onClick}
                startIcon={<AddIcon />}
                variant="contained"
              >
                {label !== specializedKey
                  ? label
                  : t('create')}
              </Button>
            </Box>
          </Hidden>
          <Hidden lgUp>
            <ButtonWithIcon
              onClick={onClick}
              icon={AddIcon}
              label="create"
              className={cls.button}
            />
          </Hidden>
        </Box>
      )}
      title={`${collectionName}New`}
      variant="drawer"
    />
  ) : null;
};

AddNewDialog.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AddNewDialog;
