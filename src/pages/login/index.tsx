import React, { FormEvent } from 'react';

const url = process.env.REACT_APP_API_URL;

const Login: React.FC = () => {
  const login = (param: { username: string; password: string }) => {
    
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    login({ username, password });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};

export default Login;
