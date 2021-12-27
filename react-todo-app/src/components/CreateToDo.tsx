import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';

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
      <input {...register('ToDo')} type='text' placeholder='Write a to do' />
      <input type='submit' value='Add' />
    </form>
  );
};

export default CreateToDo;
