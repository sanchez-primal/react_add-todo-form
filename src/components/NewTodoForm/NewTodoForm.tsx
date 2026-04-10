import { useState } from "react";
import usersFromServer from "../../api/users";
import { Todo } from "../../types/Todo";

type Props = {
  onAdd: (todo: Omit<Todo, 'user'>) => void;
};

const validTitleRegex = /^[0-9A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії'\s]*$/;

export const NewTodoForm: React.FC<Props> = ({ onAdd }) => {
  const [formIteration, setFormIteration] = useState(0);
  const [titleInput, setTitleInput] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserError, setSelectedUserError] = useState(false);

  function handleTitleInput(input: string) {
    if (validTitleRegex.test(input)) {
      setTitleError(false);
      setTitleInput(input);
    }
  }

  function handleUserSelect(id: string) {
    setSelectedUserError(false);
    setSelectedUser(id);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let breakSubmit = false;

    if (!titleInput.trim().length) {
      setTitleError(true);
      breakSubmit = true;
    }

    if (!selectedUser) {
      setSelectedUserError(true);
      breakSubmit = true;
    }

    if (breakSubmit) {
      return;
    }

    onAdd({
      id: 0,
      title: titleInput,
      userId: +selectedUser,
      completed: false,
    });

    setFormIteration(current => current + 1);
    setTitleInput('');
    setSelectedUser('');
  }

  return (
    <>
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        key={formIteration}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Input a title"
            value={titleInput}
            onChange={e => handleTitleInput(e.target.value)}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            data-cy="userSelect"
            onChange={e => handleUserSelect(e.target.value)}
          >
            <option
              value={''}
              selected
            >
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => {
              return (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              )
            })}
          </select>

          {selectedUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
}
