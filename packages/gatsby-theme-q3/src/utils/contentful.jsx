import React from 'react';
import { get } from 'lodash';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { MARKS, BLOCKS } from '@contentful/rich-text-types';

const imageRender = (node, locale) => {
  const { title, description, file } = get(
    node,
    'data.target.fields',
    {},
  );

  if (!file || !(locale in file)) {
    return null;
  }

  const mimeType = file[locale].contentType;
  const mimeGroup = mimeType.split('/')[0];

  if (mimeGroup === 'image') {
    return (
      <img
        title={title ? title[locale] : null}
        alt={description ? description[locale] : null}
        src={file[locale].url}
      />
    );
  }

  return null;
};

export default (json, locale = 'en-CA') =>
  documentToReactComponents(json, {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text) => <i>{text}</i>,
      [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
      [MARKS.CODE]: (text) => <code>{text}</code>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Typography component="p">{children}</Typography>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <Typography variant="h1" gutterBottom>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <Typography variant="h2" gutterBottom>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <Typography variant="h3" gutterBottom>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <Typography variant="h4" gutterBottom>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <Typography variant="h5" gutterBottom>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <Typography variant="h6" gutterBottom>
          {children}
        </Typography>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <List component="ol">{children}</List>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <List component="ul">{children}</List>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          {children}
        </ListItem>
      ),
      [BLOCKS.HR]: () => <Divider />,
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote>{children}</blockquote>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) =>
        imageRender(node, locale),
    },
  });
