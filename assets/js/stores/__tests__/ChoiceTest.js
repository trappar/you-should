import Choice from '../Choice';

test('Choice initializes correctly', () => {
  const choice = new Choice();

  expect(choice.id.length).toBeGreaterThan(10);
});
