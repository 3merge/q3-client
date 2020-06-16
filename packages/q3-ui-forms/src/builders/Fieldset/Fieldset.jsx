import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const Fieldset = ({ children, name }) => (
  <Grid data-multistep-name={name} container spacing={2}>
    {children}
  </Grid>
);

Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

export const getAllMultistepFieldsetComponents = (
  children,
) =>
  React.Children.toArray(children)
    .flatMap((item) => {
      if (
        item.type === React.createElement(Fieldset).type &&
        item.props &&
        item.props.name
      )
        return {
          name: item.props.name,
          component: item,
        };

      if (item.props && item.props.children)
        return getAllMultistepFieldsetComponents(
          item.props.children,
        );

      return [];
    })
    .filter(Boolean);

export default Fieldset;
