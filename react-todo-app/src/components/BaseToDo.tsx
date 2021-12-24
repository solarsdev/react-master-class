import { useRecoilState } from 'recoil';
import { toDoState } from '../atoms';
import ToDo from '../interfaces/ToDo';

const BaseToDo = ({ text, category, id }: ToDo) => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClick = (newCategory: ToDo['category']) => {
    const targetPosition = toDos.findIndex((toDo) => toDo.id === id);
    const newToDo: ToDo = { text, id, category: newCategory };
    // replace with new ToDo
    setToDos((prevToDos) => {
      const newToDos = [...prevToDos];
      newToDos[targetPosition] = newToDo;
      return newToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && <button onClick={() => onClick('DOING')}>Doing</button>}
      {category !== 'TO_DO' && <button onClick={() => onClick('TO_DO')}>To Do</button>}
      {category !== 'DONE' && <button onClick={() => onClick('DONE')}>Done</button>}
    </li>
  );
};

export default BaseToDo;
