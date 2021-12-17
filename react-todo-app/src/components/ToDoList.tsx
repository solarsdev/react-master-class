import { useRecoilValue } from 'recoil';
import { toDoState } from '../atoms';
import BaseToDo from './BaseToDo';
import CreateToDo from './CreateToDo';

const ToDoList = () => {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>ToDos</h1>
      <hr />
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
