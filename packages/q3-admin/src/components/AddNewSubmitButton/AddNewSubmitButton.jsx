/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { isEqual } from 'lodash';
import { useOpen } from 'useful-state';
import { useAllowSubmit } from 'q3-ui-forms/lib/hooks';
import { useTranslation } from 'q3-ui-locale';

const AddNewSubmitButton = ({ options, setOptions }) => {
  const { anchorEl, isOpen, open, close } = useOpen();
  const isSubmittable = useAllowSubmit();
  const { t } = useTranslation('labels');

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
    onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      setOptions(item.state);
      close(e);
    },
  }));

  return (
    <Grid item xs={12}>
      <ButtonGroup
        variant="contained"
        color="secondary"
        ref={anchorEl}
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
          aria-controls={isOpen ? 'create-menu' : undefined}
          aria-expanded={isOpen ? 'true' : undefined}
          aria-label="options"
          aria-haspopup="menu"
          onClick={open}
          style={{
            borderLeft: '1px solid',
          }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Menu
        id="create-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={close}
      >
        {menuItems.map((option) => (
          <MenuItem
            dense
            key={option.label}
            onClick={option.onClick}
            selected={option.selected}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
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
