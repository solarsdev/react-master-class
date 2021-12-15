import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface FormProps {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  extraError?: string;
}

const Error = styled.span`
  color: red;
`;

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onValid = (data: FormProps) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
        <input
          {...register('email', {
            required: 'Email is required!',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com/,
              message: 'Only naver.com email is allowed',
            },
          })}
          placeholder='Enter email'
        />
        {errors?.email ? <Error>{errors.email.message}</Error> : null}
        <input
          {...register('username', { required: 'Username is required!', minLength: 10 })}
          placeholder='Enter username'
        />
        {errors?.username ? <Error>{errors.username.message}</Error> : null}
        <input
          {...register('password', { required: 'Password is required!', minLength: 5 })}
          placeholder='Enter password'
        />
        {errors?.password ? <Error>{errors.password.message}</Error> : null}
        <input
          {...register('passwordConfirm', {
            required: 'Password  Confirm is required!',
            minLength: {
              value: 5,
              message: 'Password is too short',
            },
          })}
          placeholder='Enter password confirm'
        />
        {errors?.passwordConfirm ? <Error>{errors.passwordConfirm.message}</Error> : null}
        <input type='submit' value='Add ToDo' />
      </form>
    </div>
  );
};

export default ToDoList;
