import { string } from 'q3-ui-helpers';

const { toDate } = string;
const renderDate = ({ value }) => toDate(value);

export default renderDate;
