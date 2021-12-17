import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';
import FormProps from '../interfaces/FormProps';

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = ({ ToDo }: FormProps) => {
    setToDos((prevToDos) => [{ id: Date.now(), text: ToDo, category: 'TO_DO' }, ...prevToDos]);
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
