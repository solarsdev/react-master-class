import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoSelector } from '../atoms';
import BaseToDo from './BaseToDo';
import CreateToDo from './CreateToDo';

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const setCategory = useSetRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <form>
        <select onInput={onInput}>
          <option value={'TO_DO'}>To Do</option>
          <option value={'DOING'}>Doing</option>
          <option value={'DONE'}>Done</option>
        </select>
      </form>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <BaseToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
