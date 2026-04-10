import './App.scss';
import { useState } from 'react';

import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';

import { assignUserToObject } from './utility/assignUserToObject';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const todosWithUsers: Todo[] = (() => {
  return todosFromServer.map(assignUserToObject);
})();

function generateNewId<T extends { id: number }>(objects: T[]) {
  let highestId = -1;

  for (const obj of objects) {
    if (obj.id > highestId) {
      highestId = obj.id;
    }
  }

  return highestId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);

  function handleAddNewTodo(newTodo: Omit<Todo, 'user'>) {
    const todo = assignUserToObject(newTodo);

    todo.id = generateNewId(todos);

    setTodos(current => [...current, todo]);
  }

  return (
    <div className="App">
      <NewTodoForm onAdd={handleAddNewTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
