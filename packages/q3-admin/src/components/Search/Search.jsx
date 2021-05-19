import React from 'react';
import { useNavigate, useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { useValue } from 'useful-state';
import { string } from 'q3-ui-helpers';
import { Definitions } from '../../containers/state';

export default (SearchComponent) => () => {
  const { t } = useTranslation('labels');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = React.useRef();

  const locationSearch = new URLSearchParams(
    location?.search,
  );
  const { value, onChange, setValue } = useValue(
    locationSearch.get('search'),
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

    navigate(
      val
        ? `${directoryPath}?search=${string.encode(val)}`
        : directoryPath,
    );
  };

  const textFieldProps = {
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

  return <SearchComponent {...textFieldProps} />;
};
