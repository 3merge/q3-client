import React from 'react';
import PropTypes from 'prop-types';
import { map, size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { useNavigate } from '@reach/router';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import DetailOpptionsInlineEditor from '../DetailOptionsInlineEditor';
import { useRegisterActions } from '../../hooks';
import useStyle from '../DetailMeta/styles';

const DetailOptions = ({ registerOptions }) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');
  const options = useRegisterActions(registerOptions);
  const navigate = useNavigate();

  return size(options) ? (
    <List
      className={cls.meta}
      style={{ marginBottom: -16 }}
    >
      {map(options, (option) => {
        const title = t(option.title);
        const description = t(option.description);

        const hasClickEvent =
          option.editable || option.href;

        const handleClickEvent = (evt) => {
          try {
            evt.currentTarget
              .querySelector("[role='button']")
              .click();
          } catch (e) {
            if (option.href) {
              navigate(option.href);
            }
          }
        };

        return (
          <ListItem
            button
            component="li"
            dense
            className={cls.listItem}
            key={option.title}
            onClick={handleClickEvent}
            style={{
              cursor: hasClickEvent ? 'pointer' : 'initial',
            }}
            tabIndex={hasClickEvent ? undefined : -1}
          >
            <ListItemIcon>
              {option.href ? (
                <CallMadeIcon />
              ) : (
                <DetailOpptionsInlineEditor
                  {...option}
                  title={title}
                />
              )}
            </ListItemIcon>
            <ListItemText
              primary={title}
              primaryTypographyProps={{
                className: cls.primary,
              }}
              secondary={description}
              secondaryTypographyProps={{
                className: cls.secondary,
              }}
            />
          </ListItem>
        );
      })}
    </List>
  ) : null;
};

DetailOptions.defaultProps = {
  registerOptions: null,
};

DetailOptions.propTypes = {
  registerOptions: PropTypes.func,
};

export default DetailOptions;
