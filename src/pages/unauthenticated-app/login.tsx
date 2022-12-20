import { useAuth } from 'hooks';
import { FormEvent } from 'react';

const url = process.env.REACT_APP_API_URL;

const Login = () => {
  const { login, user } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    login({ username, password });
  };
  return (
    <>
      <div>{user?.name}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
