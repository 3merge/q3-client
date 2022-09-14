import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
import Pagination from '@material-ui/lab/Pagination';
import { useQueryParams } from 'q3-ui-queryparams';
import { get } from 'lodash';
import { Store } from '../state';

const CustomPagination = () => {
  const { total } = React.useContext(Store);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { decode, encode } = useQueryParams();
  const decoded = decode(search);

  const onChange = React.useCallback(
    (e, num) =>
      navigate(
        pathname +
          encode(
            {
              ...decoded,
              page: num,
            },
            {
              includePageParam: true,
            },
          ),
      ),
    [],
  );

  return (
    <Pagination
      // no longer support for changing limit
      count={Math.ceil(total / 25)}
      onChange={onChange}
      page={Number(get(decoded, 'page', 1))}
      shape="rounded"
      showFirstButton
      showLastButton
    />
  );
};

export default CustomPagination;
