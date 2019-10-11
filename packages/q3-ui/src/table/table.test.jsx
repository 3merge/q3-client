import LinearProgress from '@material-ui/core/LinearProgress';
import TablePagination from '@material-ui/core/TablePagination';
import { TableView as Table, Templated } from '.';
import { EmptyGraphic, ErrorGraphic } from '../graphic';
import { materialShallow } from '../_helpers/testUtils';

const MockRow = () => null;

const toHaveLength = (wrapper, node, length) =>
  expect(wrapper.find(node)).toHaveLength(length);

const rows = [
  {
    id: '1',
    name: 'Foo',
  },
];

const initProps = {
  loading: true,
  rowTemplate: MockRow,
  onChange: jest.fn(),
  location: {
    search: '',
    pathname: '/',
  },
  history: {
    push: jest.fn(),
  },
};

describe('Loading state', () => {
  it('should render spinner', (done) => {
    const wrapper = materialShallow(Table, initProps);
    toHaveLength(wrapper, LinearProgress, 1);
    setTimeout(() => {
      wrapper.setProps({
        loading: false,
        rows,
      });

      toHaveLength(wrapper, LinearProgress, 0);
      toHaveLength(wrapper, Templated, 1);
      done();
    }, 10);
  });

  it('should render empty graphic', (done) => {
    const wrapper = materialShallow(Table, initProps);
    setTimeout(() => {
      wrapper.setProps({
        loading: false,
        rows: [],
      });
      toHaveLength(wrapper, EmptyGraphic, 1);
      done();
    }, 10);
  });

  it('should render error graphic', (done) => {
    const wrapper = materialShallow(Table, initProps);
    setTimeout(() => {
      wrapper.setProps({
        loading: false,
        error: true,
      });
      toHaveLength(wrapper, ErrorGraphic, 1);
      done();
    }, 10);
  });

  it('should paginate', () => {
    const scrollToSpy = jest.fn();
    global.scrollTo = scrollToSpy;
    const wrapper = materialShallow(Table, initProps);
    wrapper
      .find(TablePagination)
      .props()
      .onChangePage({}, 1);
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    expect(initProps.history.push).toHaveBeenCalledWith(
      '?page=2',
    );
  });
});
