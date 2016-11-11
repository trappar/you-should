import AlertStore from '../AlertStore';

test('Adding and clearing works correctly', () => {
  const alertStore = new AlertStore();
  const pageAlertStore = alertStore.getChild('some-page');

  alertStore.addError('problem!');
  pageAlertStore.addError('other problem!');
  expect(pageAlertStore.errors).toEqual(['problem!', 'other problem!']);
  alertStore.clearErrors();
  expect(pageAlertStore.errors).toEqual(['other problem!']);
  alertStore.addError('new problem!');
  expect(pageAlertStore.errors).toEqual(['new problem!', 'other problem!']);
  pageAlertStore.clearErrors();
  expect(pageAlertStore.errors).toEqual([]);
});
