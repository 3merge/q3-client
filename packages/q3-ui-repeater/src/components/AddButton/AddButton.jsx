import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Dialog from 'q3-ui-dialog';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Add from '@material-ui/icons/Add';

const ForwardProps = ({ children, ...rest }) =>
  React.cloneElement(children, rest);

const AddButtonTableRow = (props) => (
  <Box>
    <Dialog {...props} />
  </Box>
);

export const AddButtonTrigger = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Box id="q3-repeater-add-button">
      <Hidden smDown>
        <Box ml={1}>
          <Button
            color="secondary"
            onClick={onClick}
            variant="contained"
          >
            {t('labels:addNew')}
          </Button>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          color="inherit"
          onClick={onClick}
          label={t('labels:addNew')}
        >
          <Add />
        </IconButton>
      </Hidden>
    </Box>
  );
};

AddButtonTrigger.propTypes = {
  /**
   * Click handler for custom button.
   */
  onClick: PropTypes.func.isRequired,
};

const AddButton = ({
  name,
  collectionName,
  initialValues,
  create,
  children,
}) => (
  <AddButtonTableRow
    variant="drawer"
    title={`${name}Create`}
    renderTrigger={(open) => (
      <AddButtonTrigger onClick={open} />
    )}
    renderContent={(close) => (
      <ForwardProps
        onSubmit={(...args) =>
          create(...args).then(() => {
            close();
          })
        }
        collectionName={collectionName}
        initialValues={initialValues}
        isNew
      >
        {children}
      </ForwardProps>
    )}
  />
);

AddButton.defaultProps = {
  name: '',
};

AddButton.propTypes = {
  /**
   * Used to create a unique Dialog title.
   */
  name: PropTypes.string,

  /**
   * Used to determine permission level
   */
  collectionName: PropTypes.string.isRequired,

  /**
   * Empty state for new resource
   */
  initialValues: PropTypes.shape({}).isRequired,

  /**
   * On submit handler
   */
  create: PropTypes.func.isRequired,

  /**
   * Used to clone editor into an "Add" form.
   */
  children: PropTypes.node.isRequired,
};

export default AddButton;
