import { TextInput, PasswordInput, Group, Button } from '@mantine/core';

import { Form } from './styles';

import { useForm } from '@mantine/form';
import { useAuth } from 'hooks';

const Login = () => {
  const { register } = useAuth();
  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: value => (value !== '' ? null : 'Please Input Username'),
      password: value => (value !== '' ? null : 'Please Input Password')
    }
  });

  const handleSubmit = ({
    username,
    password
  }: {
    username: string;
    password: string;
  }) => {
    register({ username, password }).catch(({ message }) => {
      form.reset();
      form.setErrors({ username: message, password: message });
    });
  };

  return (
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Username"
        placeholder="Your Username"
        {...form.getInputProps('username')}
      />
      <PasswordInput
        withAsterisk
        label="Password"
        placeholder="Your Password"
        {...form.getInputProps('password')}
      />
      <Group position="center" grow>
        <Button type="submit">REGISTER</Button>
      </Group>
    </Form>
  );
};

export default Login;
