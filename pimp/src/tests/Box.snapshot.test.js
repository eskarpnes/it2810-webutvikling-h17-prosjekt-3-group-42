import Box from '../components/Box';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

test('Box component should render as expected', () =>{
  const component = shallow(<Box />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
