import { Menu, Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import { ReactComponent as SoftWareSvg } from 'assets/software-logo.svg';
import { Header, HeaderLeft, HeaderRight } from './styles';

import { useAuth } from 'hooks';

const PageHeader = () => {
  const { user, logout } = useAuth();

  return (
    <Header between>
      <HeaderLeft gap>
        <SoftWareSvg width="18rem" color="rgb(38,132,255)" />
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Menu
          shadow="md"
          width={150}
          trigger="hover"
          openDelay={100}
          closeDelay={100}
          offset={3}
        >
          <Menu.Target>
            <Button variant="subtle">{user?.name}</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconLogout size={14} />} onClick={logout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </HeaderRight>
    </Header>
  );
};

export default PageHeader;
