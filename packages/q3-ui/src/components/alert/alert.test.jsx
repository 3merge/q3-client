import { materialMount } from '../../helpers/testUtils';
import Alert from '.';

test('Should dismiss the alert', () => {
  const mounted = materialMount(Alert, {
    label: 'womp',
    type: 'success',
  });

  expect(mounted.text()).toBe('notifications:womp');
  mounted.find('button').simulate('click');
  const el = mounted.find('[role="alert"]');
  expect(el).toHaveLength(0);
});
