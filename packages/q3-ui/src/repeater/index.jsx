import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Grow from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '../list';
import Tile from '../tile';
import Graphic from '../graphic';
import ServerError from '../error';
import unpopulated from '../../images/unpopulated.png';
import { useOpenState } from '../dialogs';
import Wizard from '../wizard';

const isObject = (item) => typeof item === 'object';

const assignIDs = (a) =>
  a.map((item, i) => {
    if (isObject(item) && !item.id) {
      return { ...item, id: i };
    }
    return item;
  });

const GrowIn = ({ children }) => (
  <Grow in>
    <div>{children}</div>
  </Grow>
);

GrowIn.propTypes = {
  children: PropTypes.node.isRequired,
};

const renderTextWithPrefix = (s = '', pre) => `${pre}${s}`;

const renderText = (s = '', args) =>
  typeof s === 'function' ? s(args) : get(args, s);

const AddNewWizard = (props) => {
  const { onSubmit } = props;
  const { t } = useTranslation();
  const { open, ...openState } = useOpenState();

  return onSubmit ? (
    <Box mt={1}>
      <Button
        onClick={open}
        variant="contained"
        color="primary"
      >
        {t('labels:create')}
      </Button>
      <Wizard
        title={t('titles:add')}
        {...openState}
        {...props}
      />
    </Box>
  ) : null;
};

AddNewWizard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const Repeater = ({
  name,
  description,

  /** textual elements */
  primary,
  secondary,
  primaryPrefix,
  secondaryPrefix,
  renderIcon,

  /** seed */
  data,
  fetchingError,
  fetching,

  /** services */
  deleteOne,
  edit,
  create,

  /** wizard base props  */
  wizardProps,
}) => {
  const { t } = useTranslation();
  const list = assignIDs(data);

  const executeRenderTextOptions = (item, key, prefix) =>
    renderTextWithPrefix(renderText(key, item), prefix);

  const renderInterior = () => {
    if (fetchingError)
      return (
        <GrowIn>
          <ServerError />
        </GrowIn>
      );

    if (!list.length)
      return (
        <GrowIn>
          <Graphic
            alt={t('labels:unpopulated')}
            src={unpopulated}
          />
        </GrowIn>
      );

    return (
      <List
        updateOne={edit}
        deleteOne={deleteOne}
        items={assignIDs(data).map((item) => {
          const getIcon = () =>
            renderIcon && typeof renderIcon === 'function'
              ? renderIcon(item)
              : null;

          return Object.assign(item, wizardProps, {
            icon: getIcon(),
            primary: executeRenderTextOptions(
              item,
              primary,
              primaryPrefix,
            ),
            secondary: executeRenderTextOptions(
              item,
              secondary,
              secondaryPrefix,
            ),
          });
        })}
      />
    );
  };

  return (
    <Tile
      title={t(`titles:${name}`)}
      loading={fetching}
      error={fetchingError}
      subtitle={
        description
          ? t(`descriptions:${description}`)
          : null
      }
    >
      {renderInterior()}
      <AddNewWizard
        isNew
        onSubmit={create}
        {...wizardProps}
      />
    </Tile>
  );
};

Repeater.propTypes = {
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  primary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  secondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  description: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  fetchingError: PropTypes.bool,
  fetching: PropTypes.bool,
  primaryPrefix: PropTypes.string,
  secondaryPrefix: PropTypes.string,
  renderIcon: PropTypes.func,
  deleteMany: PropTypes.func,
  deleteOne: PropTypes.func,
  edit: PropTypes.func,
  create: PropTypes.func,
  wizardProps: PropTypes.shape({
    getValidation: PropTypes.func,
    getContent: PropTypes.func,
    initialValues: PropTypes.object,
  }).isRequired,
};

Repeater.defaultProps = {
  fetching: false,
  fetchingError: false,
  description: null,
  subtitle: null,
  data: [],
  primaryPrefix: '',
  secondaryPrefix: '',
  renderIcon: null,
  deleteMany: null,
  deleteOne: null,
  edit: null,
  create: null,
};

export default Repeater;
