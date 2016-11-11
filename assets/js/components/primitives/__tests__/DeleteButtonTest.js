jest.useFakeTimers();

import React from 'react';
import DeleteButton from '../DeleteButton';
import {mount} from 'enzyme';

test('DeleteButton is working when clicked twice', () => {
  const fakeEvent = {
    stopPropagation: () => false
  };
  let button = mount(<DeleteButton/>);

  expect(button.find('i').length).toBe(1);
  button.simulate('click', fakeEvent);
  expect(button.text()).toBe('You sure?');
  expect(setTimeout.mock.calls[0][1]).toBe(1500);
  jest.runAllTimers();
  expect(button.find('i').length).toBe(1);
  button.simulate('click', fakeEvent);
  button.simulate('click', fakeEvent);
  expect(button.text()).toBe('Removing');
  expect(button.find('button').prop('disabled')).toBe(true);
});
