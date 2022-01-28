import { useLocation, useNavigate } from '@reach/router';
import { useQueryParams } from 'q3-ui-queryparams';
import useObjectIdLabels from '../useObjectIdLabels';
import { SchemaToFieldBuilder } from '../../helpers';

const useLocationWithQueryParams = (schema) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { decode, encode } = useQueryParams();
  const sf = SchemaToFieldBuilder.init(schema);

  sf.forEachObjectId(({ ref, alias, field }) =>
    useObjectIdLabels(
      `/${ref}?fields=id,${field}`,
      ref || alias,
      field,
    ),
  );

  return {
    initialValues: sf.getInitialValues(decode(search)),
    makeCounter: sf.makeCounter.bind(sf),
    map: sf.map.bind(sf),

    apply: (values) => {
      navigate(pathname + encode(sf.toQuery(values)));
    },
  };
};

export default useLocationWithQueryParams;
