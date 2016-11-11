import React from 'react';
import Button from '../Button';
import {shallow} from 'enzyme';

test('Correct classes are being applied', () => {
  let button = shallow(<Button extraClasses="btn-primary">Test</Button>);
  expect(button.find('button').prop('className')).toBe('btn btn-primary');

  button = shallow(<Button>Test</Button>);
  expect(button.find('button').prop('className')).toBe('btn');
});
