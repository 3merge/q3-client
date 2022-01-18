import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTranslation } from 'q3-ui-locale';
import AuditTemplateSelect from '../AuditTemplateSelect';
import Timeline from '../Timeline';
import withAuditAuth from '../withAuditAuth';
import useAudit from '../useAudit';

const Audit = ({ data, collectionName, templates }) => {
  const [filterState, setFilterState] = React.useState({});
  const [showResults, setShowResults] =
    React.useState(false);

  const { t } = useTranslation();

  const timeline = useAudit(
    collectionName,
    data.id,
    filterState,
  );

  const handleBack = () => setShowResults(false);

  const handleSubmit = (values) =>
    new Promise((resolve) => {
      setFilterState(values);
      setShowResults(true);
      resolve();
    });

  return (
    <Box position="relative">
      {showResults ? (
        <Box>
          <Box>
            <Button
              className="q3-ui-audit-back"
              onClick={handleBack}
              startIcon={<ArrowBackIosIcon />}
            >
              {t('labels:back')}
            </Button>
          </Box>
          <Timeline {...timeline} />
        </Box>
      ) : (
        <Box>
          <Typography>
            {t('descriptions:auditLogs')}
          </Typography>
          <AuditTemplateSelect
            initialValues={filterState}
            templates={templates}
            onSubmit={handleSubmit}
          />
        </Box>
      )}
    </Box>
  );
};

Audit.defaultProps = {};

Audit.propTypes = {
  collectionName: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  // eslint-disable-next-line
  templates: PropTypes.object.isRequired,
};

export default withAuditAuth(Audit);
