import Clock from '../components/Clock/Clock';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

test('Clock component should render as expected', () =>{
  const component = shallow(<Clock />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
