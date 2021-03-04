import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import FiltersForm from '../filters/FiltersForm';
import Segments from '../segments';

const Groups = ({ children, ...etc }) => {
  const { t } = useTranslation('labels');

  return (
    <Segments>
      {(renderer, onSave, searchValue) => (
        <FiltersForm
          search={searchValue}
          onSave={onSave}
          {...etc}
        >
          {(...params) => (
            <>
              <Grid item xs={12}>
                {renderer()}
              </Grid>
              {children(...params)}
              <Grid item xs={12}>
                <Button type="submit">{t('save')}</Button>
              </Grid>
            </>
          )}
        </FiltersForm>
      )}
    </Segments>
  );
};

Groups.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Groups);
