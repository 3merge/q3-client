import React from 'react';
import { Location, navigate } from '@reach/router';
import { useTranslation } from 'q3-ui-locale';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { DropDownMenu } from 'q3-ui/lib/toolbar';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import { Field } from 'q3-ui-forms/lib/builders';
import Dialog from 'q3-ui-dialog';

const useStyle = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: 60,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
}));

const clamp = (v) => (v === -1 ? 0 : v + 1);
const isString = (v) => typeof v === 'string';

const clean = (a) => (b) =>
  isString(a) &&
  isString(b) &&
  a
    .replace('?', '')
    .replace(/(%20)|\+/gi, ' ')
    .toLowerCase()
    .includes(b.toLowerCase());

export const findIndexByStartsWith = (queries, term) =>
  clamp(Object.values(queries).findIndex(clean(term)));

export const withSearchQuery = (Component) => (props) =>
  (
    <Location>
      {({ location: { search } }) => (
        <Component {...props} search={search} />
      )}
    </Location>
  );

export const Groups = ({ queries, search, filterMenu }) => {
  const active = findIndexByStartsWith(queries, search);
  const { t } = useTranslation('labels');
  const { root } = useStyle();

  return (
    <Container disableGutter className={root} maxWidth="xl">
      {Object.entries(queries).map(([label, query], i) => (
        <DropDownMenu
          items={[
            {
              label: 'Favourite it',
              onClick: () => null,
            },
            {
              label: 'Delete it',
              onClick: () => null,
            },
          ]}
        >
          {(open, isOpen) => {
            let color;

            if (active === i) color = 'secondary';
            if (isOpen) color = 'primary';

            return (
              <ButtonGroup
                variant="contained"
                color={color}
                aria-label="split button"
              >
                <Button onClick={() => console.log(query)}>
                  {t(label)}
                </Button>
                <Button
                  color={color}
                  size="small"
                  aria-controls={
                    isOpen ? 'split-button-menu' : undefined
                  }
                  aria-expanded={
                    isOpen ? 'true' : undefined
                  }
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={open}
                >
                  <MoreVertIcon />
                </Button>
              </ButtonGroup>
            );
          }}
        </DropDownMenu>
      ))}
      <Dialog
        variant="drawer"
        renderTrigger={(onClick) => (
          <Chip
            label="Add custom"
            onClick={onClick}
            onDelete={onClick}
            deleteIcon={<AddIcon />}
          />
        )}
        renderContent={() => (
          <EncodedUrl>
            <Field name="example" type="text" />
          </EncodedUrl>
        )}
      />
    </Container>
  );
};

/*
 <Tabs
        value={findIndexByStartsWith(queries, search)}
        variant="fullWidth"
        scrollButtons="auto"
      >
        <Tab
          label={t('all')}
          onClick={() => navigate('?')}
          centered
        />
        {Object.entries(queries).map(([label, query]) => (
          <Tab
            key={query}
            label={t(label)}
            onClick={() => navigate(`?${query}`)}
          />
        ))}
      </Tabs>
      */

Groups.propTypes = {
  /**
   * Key-value list of query presets.
   */
  queries: PropTypes.shape({}).isRequired,

  /**
   * Active search query params.
   */
  search: PropTypes.string.isRequired,
};

export default withSearchQuery(Groups);
