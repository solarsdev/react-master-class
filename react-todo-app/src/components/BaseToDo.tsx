import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Categories, ToDo, toDoState } from '../atoms';

const ToDoContainer = styled.div`
  padding: 10px;
  color: white;
  background-color: rgb(50, 50, 50);
  border-radius: 5px;
  display: flex;
`;

const ToDoStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BaseToDo = ({ text, category, id }: ToDo) => {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onClick = (newCategory: Categories) => {
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
    <ToDoContainer>
      <ToDoStatus>test</ToDoStatus>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
    </ToDoContainer>
  );
};

export default BaseToDo;
