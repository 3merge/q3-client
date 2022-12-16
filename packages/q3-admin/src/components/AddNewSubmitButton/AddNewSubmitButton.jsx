/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { isEqual } from 'lodash';
import { useAllowSubmit } from 'q3-ui-forms/lib/hooks';
import { useTranslation } from 'q3-ui-locale';
import DropdownMenu from 'q3-ui-dropdownmenu';

const AddNewSubmitButton = ({ options, setOptions }) => {
  const isSubmittable = useAllowSubmit();
  const { t } = useTranslation('labels');
  const id = 'create-menu';

  const menuItems = [
    {
      label: 'createAndRedirect',
      state: {
        closeOnComplete: false,
        redirectToNewDocument: true,
        resetOnComplete: false,
        showSuccessMessage: false,
      },
    },
    {
      label: 'createAndRestart',
      state: {
        closeOnComplete: false,
        redirectToNewDocument: false,
        resetOnComplete: true,
        showSuccessMessage: true,
      },
    },
    {
      label: 'createAndClose',
      state: {
        closeOnComplete: true,
        redirectToNewDocument: false,
        resetOnComplete: false,
        showSuccessMessage: false,
      },
    },
  ].map((item) => ({
    label: t(item.label),
    selected: isEqual(item.state, options),
    onClick() {
      setOptions(item.state);
    },
  }));

  return (
    <Grid item xs={12}>
      <DropdownMenu id={id} items={menuItems}>
        {(toggle, isOpen) => (
          <ButtonGroup
            variant="contained"
            color="secondary"
            aria-label="submit actions"
          >
            <Button disabled={!isSubmittable} type="submit">
              {
                menuItems.find((option) => option.selected)
                  ?.label
              }
            </Button>
            <Button
              color="secondary"
              size="small"
              aria-controls={isOpen ? id : undefined}
              aria-expanded={isOpen ? 'true' : undefined}
              aria-label="options"
              aria-haspopup="menu"
              onClick={toggle}
              style={{
                borderLeft: '1px solid',
              }}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
        )}
      </DropdownMenu>
    </Grid>
  );
};

AddNewSubmitButton.propTypes = {
  options: PropTypes.shape({
    closeOnComplete: PropTypes.bool,
    redirectToNewDocument: PropTypes.bool,
    resetOnComplete: PropTypes.bool,
  }).isRequired,
  setOptions: PropTypes.func.isRequired,
};

export default AddNewSubmitButton;
