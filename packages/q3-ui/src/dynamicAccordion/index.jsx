import React from 'react';
import { get } from 'lodash';

import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useIndex from '../useIndex';

const Panel = ({
  active,
  onChange,
  title,
  description,
  slug,
  ...rest
}) => (
  <ExpansionPanel
    elevation={0}
    expanded={active}
    onChange={onChange}
  >
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h3" component="p">
        {title}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography variant="body2">
        {description}
        <Box mt={2}>
          <Button component={Link} to={slug}>
            Read more
          </Button>
        </Box>
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

const DynamicAccordion = ({ panels }) => {
  const { active, handleChange } = useIndex(0);

  return (
    <Container style={{ margin: '3rem auto' }}>
      <Grid container spacing={8}>
        <Grid item md={6} xs={12}>
          {panels.map((item, i) => (
            <Panel
              active={active === i}
              onChange={handleChange(i)}
              slug={get(item, 'case.client')}
              {...item}
            />
          ))}
        </Grid>
        <Grid item md={6} xs={12}>
          {panels.map(
            (item, i) =>
              active === i && (
                <Fade in key={i}>
                  {item.component}
                </Fade>
              ),
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

DynamicAccordion.propTypes = {};
DynamicAccordion.defaultProps = {};

export default DynamicAccordion;
