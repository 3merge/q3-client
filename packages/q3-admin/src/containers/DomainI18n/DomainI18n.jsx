import React from 'react';
import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'q3-ui-locale';
import { Builders } from 'q3-ui-forms';
import { isObject } from 'lodash';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import useDomainContext from '../../hooks/useDomainContext';
import SystemPageSub from '../../components/SystemPageSub';

const DomainI18n = () => {
  const [value, setValue] = React.useState(0);
  const { domain = {}, update } = useDomainContext();
  const { lng, resources = {}, supportedLngs } = domain;
  const { t } = useTranslation();
  const hasMultipleLanguages = Array.isArray(supportedLngs)
    ? supportedLngs.length && supportedLngs.length > 1
    : false;

  const initialValues = resources;
  const expectedNamespaces = [
    'titles',
    'descriptions',
    'labels',
    'helpers',
  ];

  const handleChange = (_, newValue) => setValue(newValue);

  const renderNamespace = (ns) =>
    isObject(initialValues[ns]) ? (
      <Builders.Form
        isNew
        key={ns}
        collectionName="domain"
        submitLabel="save"
        showSuccessMessage
        initialValues={initialValues[ns]}
        onSubmit={(values) =>
          update({
            resources: {
              ...initialValues,
              [ns]: values,
            },
          })
        }
      >
        {Object.keys(initialValues[ns]).map((k) => (
          <Builders.Field
            under={`resources.${ns}`}
            multiline={['descriptions', 'helpers'].includes(
              ns,
            )}
            rows={3}
            name={k}
            key={k}
            xl={12}
            lg={12}
            suppressLabel
            suppressHelper
          />
        ))}
      </Builders.Form>
    ) : null;

  return (
    <SystemPageSub maxWidth="xl" title="domainI18n">
      <Alert severity="info">
        {t('descriptions:localeEditorChangeEffect')}
      </Alert>
      {hasMultipleLanguages && (
        <Box mt={1}>
          <Alert severity="info">
            {t('descriptions:localeEditor', {
              lng,
            })}
          </Alert>
        </Box>
      )}
      <Box mt={1}>
        {isObject(initialValues) ? (
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              {expectedNamespaces.map((l, v) => (
                <Tab
                  disabled={!(l in initialValues)}
                  key={l}
                  label={l}
                  value={v}
                />
              ))}
            </TabList>
            {expectedNamespaces.map((l, v) => (
              <TabPanel value={v} key={v}>
                {renderNamespace(l)}
              </TabPanel>
            ))}
          </TabContext>
        ) : null}
      </Box>
    </SystemPageSub>
  );
};

export default DomainI18n;
