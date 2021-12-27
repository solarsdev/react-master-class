import { atom, selector } from 'recoil';

export interface ToDo {
  id: number;
  text: string;
  category: Categories;
}

export const toDoState = atom<ToDo[]>({
  key: 'toDo',
  default: [],
});

export enum Categories {
  'TO_DO',
  'DOING',
  'DONE',
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
