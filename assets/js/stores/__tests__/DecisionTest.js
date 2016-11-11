import Decision from '../Decision';

test('commit and restore', () => {
  let decision = new Decision();

  decision.question = 'Test';
  decision.declineChanges();
  expect(decision.question).toEqual('');

  decision.question = 'Test';
  decision.acceptChanges();
  expect(decision.question).toEqual('Test');
});

test('add choice', () => {
  let decision = new Decision();
  decision.addChoice();
  expect(decision.choices[0].priority).toEqual(10);

  decision.addChoice({
    priority: 0
  });
  expect(decision.choices[1].priority).toEqual(0);
});
