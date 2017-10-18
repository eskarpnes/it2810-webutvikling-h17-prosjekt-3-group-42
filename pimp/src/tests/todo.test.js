import Todo from '../components/Todo/Todo';
import React from 'react';
import renderer from 'react-test-renderer';

test('TodoComponent renders the text inside it', () => {
    const todo = {todo: {value: 'Klapp alpakka', id: 1}, remove: (todoId) => {alert('Removed!')}};
    const rendered = renderer.create(
        <Todo todo={todo} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();    
});