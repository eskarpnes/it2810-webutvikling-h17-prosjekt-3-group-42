import Todo from '../components/Todo/Todo';
import TodoContainer from '../components/Todo/TodoContainer';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

test('Todo component should render as expected', () =>{
  const remove = jest.fn();
  const todo ={value: 'Something', remove: remove};
  const component = shallow(<Todo todo={todo}/>);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

describe('Test the functions of the Todo component.', () =>{
  it('The add-new-todoButton calls the remove function when clicked.', () =>{
    const remove = jest.fn();
    const todo ={value: 'Something', remove: remove};
    const component = shallow(<Todo todo={todo} remove={remove}/>);
    const tree = toJson(component);
    const c = component.find('.button-add-new-todo');
    c.simulate('click');
    expect(remove).toBeCalled();
  });
});
