import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ActionBar } from 'q3-ui/lib/list';
import { Link } from '@reach/router';
import PowerIcon from '@material-ui/icons/Power';
import IconButton from 'q3-ui/lib/iconButton';
import { useTranslation } from 'react-i18next';

const Template = ({ templates }) => {
  const { t } = useTranslation();
  return (
    <List>
      {templates.map(({ name, to }) => (
        <ListItem
          title={t(`titles:${name}`)}
          description={t(`descriptions:${name}`)}
        >
          <ActionBar>
            <IconButton
              label={t('labels:apply')}
              icon={PowerIcon}
              buttonProps={{
                component: Link,
                to,
              }}
            />
          </ActionBar>
        </ListItem>
      ))}
    </List>
  );
};

Template.propTypes = {
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      to: PropTypes.string,
    }),
  ).isRequired,
};

export default Template;
