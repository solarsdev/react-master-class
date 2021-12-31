import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Categories, ToDo, toDoState } from '../atoms';

const ToDoContainer = styled.div`
  padding: 10px;
  color: white;
  background-color: rgb(50, 50, 50);
  border-radius: 5px;
  display: flex;
  align-items: center;
  height: 40px;
`;

const ToDoStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(150, 150, 150);
  font-size: 15px;
`;

const ToDoText = styled.span`
  padding: 10px;
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
      <ToDoStatus>
        <FontAwesomeIcon icon={faCircle} />
      </ToDoStatus>
      <ToDoText>{text}</ToDoText>
    </ToDoContainer>
  );
};

export default BaseToDo;
