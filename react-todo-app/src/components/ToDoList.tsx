import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Categories, categoryState, toDoSelector } from '../atoms';
import BaseToDo from './BaseToDo';
import CreateToDo from './CreateToDo';

const Background = styled.div`
  background-image: url('https://images.unsplash.com/photo-1640587896067-4e7d923143e6');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  margin: 10px 0px;
  font-size: 22px;
  color: white;
`;

const ToDos = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 2px;
`;

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const setCategory = useSetRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Background>
      <Container>
        <Title>Work Note</Title>
        <form>
          <select onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </select>
        </form>
        <CreateToDo />
        <ToDos>
          {toDos.map((toDo) => (
            <BaseToDo key={toDo.id} {...toDo} />
          ))}
        </ToDos>
      </Container>
    </Background>
  );
};

export default ToDoList;
