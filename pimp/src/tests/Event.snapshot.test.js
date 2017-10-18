import Event from '../components/Event/Event';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });



test('Event component should render as expected', () =>{
  const event = {id: '1', title: "SomeEvent", text: "AtSomePlace", eventAt: "Here"};
  const component = shallow(<Event />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('should save new event to localStorage', () => {
  let newEvent = {
    'id': 1,
    'title': 'thititle',
    'text': 'thatetext',
    'eventAt': 'tentAt'
  };
  localStorage.setItem('events',
  JSON.stringify(newEvent));
  expect(localStorage.setItem).toHaveBeenLastCalledWith('events', JSON.stringify(newEvent));
  expect(JSON.parse(localStorage.__STORE__['events'])).toEqual(newEvent);
  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
});

describe('Event button handles click', () =>{

  it('Delete button clicked', () =>{
    const event = {id: '1', title: "SomeEvent", text: "AtSomePlace", eventAt: "Here"};
    const component = shallow(<Event event={event} />);
    const b = component.find('button');
  });
});
