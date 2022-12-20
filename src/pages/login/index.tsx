import { FormEvent } from 'react';

const url = process.env.REACT_APP_API_URL;

const LoginPage = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    }).then(async response => {
      if (response.ok) {
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default LoginPage;
