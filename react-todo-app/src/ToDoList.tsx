import { useState } from 'react';

const ToDoList = () => {
  const [toDo, setToDo] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setToDo(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Type your to do' value={toDo} onChange={onChange} />
        <input type='submit' value='Add ToDo' />
      </form>
    </div>
  );
};

export default ToDoList;
