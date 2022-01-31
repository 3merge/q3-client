import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTranslation } from 'q3-ui-locale';
import AuditTemplateSelect from '../AuditTemplateSelect';
import Timeline from '../Timeline';
import withAuditAuth from '../withAuditAuth';
import withUsers from '../withUsers';
import useAudit from '../useAudit';

const Audit = ({
  id,
  collectionName,
  templates,
  users,
}) => {
  const [filterState, setFilterState] = React.useState({});
  const [showResults, setShowResults] =
    React.useState(false);

  const { t } = useTranslation();
  const timeline = useAudit(
    collectionName,
    id,
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
            users={users}
          />
        </Box>
      )}
    </Box>
  );
};

Audit.defaultProps = {
  users: [],
};

Audit.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  templates: PropTypes.arrayOf(PropTypes.string).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

export default withAuditAuth(withUsers(Audit));
