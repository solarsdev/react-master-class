import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoState } from '../atoms';

const Container = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 40px 1fr;
  background-color: rgb(30, 30, 30);
  border-radius: 5px;
  color: white;
`;

const InsertToDo = styled.input`
  background-color: transparent;
  color: white;
  border: none;
  outline: none;
  height: 45px;
  width: 100%;
  &::placeholder {
    color: white;
  }
`;

interface FormProps {
  ToDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = ({ ToDo }: FormProps) => {
    setToDos((prevToDos) => [{ id: Date.now(), text: ToDo, category }, ...prevToDos]);
    setValue('ToDo', '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <FontAwesomeIcon icon={faPlus} />
        <InsertToDo {...register('ToDo')} type='text' placeholder='μμ μΆκ°' />
      </Container>
    </form>
  );
};

export default CreateToDo;
