export const containsRenderFilterPropFn = (o) =>
  o &&
  o.renderFilter &&
  typeof o.renderFilter === 'function';
