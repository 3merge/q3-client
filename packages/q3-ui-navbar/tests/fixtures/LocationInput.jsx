import React from 'react';
import { TextField } from '@material-ui/core';
import { useLocation, useNavigate } from '@reach/router';

const LocationInput = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(search);

  React.useEffect(() => {
    setValue(search);
  }, [search]);

  const handleKeyPress = React.useCallback(
    (e) => {
      if (e.code === 'Enter')
        navigate(
          [
            pathname,
            String(value).startsWith('?')
              ? value
              : `?${value}`,
          ]
            .map(String)
            .join(''),
        );
    },
    [pathname, value],
  );

  return (
    <TextField
      id="location-changer"
      label="Path search string"
      helperText={`Press "Enter" to change the current search string for ${pathname}`}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyPress={handleKeyPress}
    />
  );
};

export default LocationInput;
