import ToDo from '../interfaces/ToDo';

const BaseToDo = ({ text }: ToDo) => {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
};

export default BaseToDo;
