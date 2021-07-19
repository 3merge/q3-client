import React from 'react';
import { useNavigate, useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { useValue } from 'useful-state';
import { compact } from 'lodash';
import { useQueryParams } from 'q3-ui-queryparams';
import { Definitions } from '../containers/state';

export default () => {
  const inputRef = React.useRef();

  const { t } = useTranslation('labels');
  const navigate = useNavigate();
  const qp = useQueryParams();

  const {
    page,
    search: currentSearchValue = '',
    ...etc
  } = qp.decode(useLocation()?.search);

  const { value, onChange, setValue } = useValue(
    currentSearchValue,
  );

  const handleReset = () => {
    setValue('');
    inputRef.current.focus();
  };

  const {
    collectionName,
    directoryPath,
  } = React.useContext(Definitions);

  const handleKeyCode = (e) => {
    const val = e.target.value;

    if (
      !['Enter', 'NumpadEnter'].includes(e?.code) &&
      e?.key !== 'Enter'
    )
      return;

    if (val) {
      etc.search = val;
    }

    navigate(
      compact([directoryPath, qp.encode(etc)]).join(''),
    );
  };

  React.useEffect(() => {
    if (currentSearchValue !== value)
      setValue(currentSearchValue);
  }, [currentSearchValue]);

  return {
    'aria-label': 'search',
    value,
    onChange,
    handleReset,
    placeholder: t(
      collectionName
        ? `${collectionName}SearchPlaceholder`
        : 'searchPlaceholder',
    ),
    fullWidth: true,
    onKeyPress: handleKeyCode,
    type: 'text',
    inputRef,
  };
};
