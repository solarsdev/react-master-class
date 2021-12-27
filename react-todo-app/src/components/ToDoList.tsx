import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Categories, categoryState, toDoSelector } from '../atoms';
import BaseToDo from './BaseToDo';
import CreateToDo from './CreateToDo';

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const setCategory = useSetRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <form>
        <select onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
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
