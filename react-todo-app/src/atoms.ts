import { atom } from 'recoil';
import ToDo from './interfaces/ToDo';

export const toDoState = atom<ToDo[]>({
  key: 'toDo',
  default: [],
});
