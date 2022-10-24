import React from 'react';
import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'q3-ui-locale';
import { Builders } from 'q3-ui-forms';
import { isObject, sortBy } from 'lodash';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
// eslint-disable-next-line
import SearchBar from 'q3-ui-repeater/lib/components/Search';
import useDomainContext from '../../hooks/useDomainContext';
import SystemPageSub from '../../components/SystemPageSub';
import useStyle from './styles';

const DomainI18n = () => {
  const cls = useStyle();
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

  const [search, setSearch] = React.useState('');
  const handleChange = (_, newValue) => setValue(newValue);

  const matchesSearchTerm = React.useCallback(
    (str) =>
      String(str)
        .toLowerCase()
        .includes(String(search).toLowerCase()),
    [search],
  );

  const shouldDisplayField = (ns, field) =>
    !search ||
    matchesSearchTerm(field) ||
    matchesSearchTerm(initialValues[ns]?.[field]);

  const renderNamespace = React.useCallback(
    (ns) =>
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
          {sortBy(
            Object.entries(initialValues[ns]),
            ([, v]) => v,
          ).map(([k]) => (
            <div
              key={k}
              style={{
                display: shouldDisplayField(ns, k)
                  ? 'block'
                  : 'none',
                width: '100%',
              }}
            >
              <Builders.Field
                under={`resources.${ns}`}
                multiline={[
                  'descriptions',
                  'helpers',
                ].includes(ns)}
                rows={3}
                name={k}
                xl={12}
                lg={12}
                suppressLabel
                helper={`Translates "${k}"`}
              />
            </div>
          ))}
        </Builders.Form>
      ) : null,
    [initialValues, search],
  );

  return (
    <SystemPageSub maxWidth="xl" title="domainI18n">
      <Box className={cls.search} mb={1}>
        <SearchBar
          handleInput={setSearch}
          variant="filled"
        />
      </Box>
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
            <TabList onChange={handleChange}>
              {expectedNamespaces.map((l, v) => (
                <Tab
                  disabled={!(l in initialValues)}
                  key={l}
                  label={t(`labels:${l}`)}
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
