import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';

interface ToDo {
  id: number;
  text: string;
  category: 'TO_DO' | 'DOING' | 'DONE';
}

interface FormProps {
  ToDo: string;
}

const toDoState = atom<ToDo[]>({
  key: 'toDo',
  default: [],
});

const ToDoList = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = ({ ToDo }: FormProps) => {
    setToDos((prevToDos) => [{ id: Date.now(), text: ToDo, category: 'TO_DO' }, ...prevToDos]);
    setValue('ToDo', '');
  };

  return (
    <div>
      <h1>ToDos</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('ToDo')} type='text' placeholder='Write a to do' />
        <input type='submit' value='Add' />
      </form>
      <ul>
        {toDos.map(({ id, text }) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
