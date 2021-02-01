import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Input, Menu } from 'semantic-ui-react';

import * as ROUTES from 'constants/routes';

const MenuBar = () => {
  const [activeItem, setactiveItem] = useState('home');

  const handleItemClick = (e, { name }) => setactiveItem(name);

  return (
    <Menu pointing secondary size="massive" color="teal">
      <Container>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to={ROUTES.HOME}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to={ROUTES.REGISTER}
          />
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to={ROUTES.LOGIN}
          />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default MenuBar;
