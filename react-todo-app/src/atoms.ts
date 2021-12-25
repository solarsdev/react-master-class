import { atom, selector } from 'recoil';
import ToDo from './interfaces/ToDo';

export const toDoState = atom<ToDo[]>({
  key: 'toDo',
  default: [],
});

export const categoryState = atom({
  key: 'category',
  default: 'TO_DO',
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
