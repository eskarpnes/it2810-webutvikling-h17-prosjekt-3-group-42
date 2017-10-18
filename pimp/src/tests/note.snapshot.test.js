import Note from '../components/Note/Note';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';


configure({ adapter: new Adapter() });



test('Note component should render as expected', () =>{
  const component = shallow(<Note />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

describe('Test the functions of the Note component.', () =>{

  const note = {title: "Tittel", text: "Tekst"};

  it('Checks if changes to the input field named title changes the title state value of the Note component.', () =>{
    const component = shallow(<Note note={note} />);
    const title = component.find('#tittelid');
    title.simulate('change', { target: { value: 'Hello' } });
    expect(component.state().title).toBe('Hello');
  });

  it('Checks if changes to the input field named text changes the text state value of the Note component.', () =>{
    const component = shallow(<Note note={note} />);
    const text = component.find('#tekstid');
    text.simulate('change', { target: { value: 'Hello' } });
    expect(component.state().text).toBe('Hello');
  });

});
