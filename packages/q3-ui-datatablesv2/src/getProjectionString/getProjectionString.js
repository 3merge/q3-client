const getProjectionString = (columns = ['id']) =>
  `fields=${columns}`;

export default getProjectionString;
