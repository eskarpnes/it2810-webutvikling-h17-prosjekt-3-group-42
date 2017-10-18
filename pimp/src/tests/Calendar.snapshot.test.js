import CalendarContainer from '../components/Calendar/CalendarContainer';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });



test('CalendarContainer component should render as expected', () =>{
  const component = shallow(<CalendarContainer />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
describe('Test the functions of the CalendarContainer component.', () =>{

  it('', () =>{
    const component = shallow(<CalendarContainer />);
    const tree = toJson(component);
    const c = component.find('Calendar');

  });


});
