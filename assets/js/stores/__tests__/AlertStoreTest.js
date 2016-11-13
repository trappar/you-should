import AlertStore from '../AlertStore';

test('Adding and clearing works correctly', () => {
  const parent = new AlertStore();
  const child = parent.getChild();

  parent.setError('problem!');
  child.setError('other problem!');

  expect(parent.get('error')).toEqual(['problem!']);
  expect(parent.get('error', 'child')).toEqual(['problem!', 'other problem!']);
  expect(parent.get('error', 'parent')).toEqual(['problem!']);

  expect(child.get('error')).toEqual(['other problem!']);
  expect(child.get('error', 'child')).toEqual(['other problem!']);
  expect(child.get('error', 'parent')).toEqual(['problem!', 'other problem!']);

  parent.clear('error', 'child');
  expect(child.errors).toEqual([]);

  parent.setError('problem!');
  child.setError('other problem!');

  child.clear('error', 'parent');
  expect(parent.errors).toEqual([]);
});
