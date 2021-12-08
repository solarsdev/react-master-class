import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`hello ${value}`);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='username' value={value} onChange={onChange} />
        <button>Login</button>
      </form>
    </div>
  );
};

export default App;
