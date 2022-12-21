import { Group } from '@mantine/core';
import styled from '@emotion/styled';
import LogoSvg from 'assets/logo.svg';
import LeftSvg from 'assets/left.svg';
import RightSvg from 'assets/right.svg';

const UnAuthenticatedAppStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.header`
  background: url(${LogoSvg}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Container = styled.div`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${LeftSvg}), url(${RightSvg});
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SwitchButton = styled(Group)`
  margin-top: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94px, 108, 132);
  text-align: center;
`;

export default UnAuthenticatedAppStyles;
export { Header, Container, Background, Form, SwitchButton, Title };
