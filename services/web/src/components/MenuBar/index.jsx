import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Container, Input, Menu } from 'semantic-ui-react';

import { AuthCtx } from 'contextAPI';
import * as ROUTES from 'constants/routes';

const MenuBar = () => {
  const { authUser } = useContext(AuthCtx);
  const { pathname } = useLocation();

  const path = pathname === '/' ? 'home' : pathname.split('/')[1];
  const [activeItem, setactiveItem] = useState(path);
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
        {authUser.isAuth ? (
          <PrivateMenuItem
            activeItem={activeItem}
            handleItemClick={handleItemClick}
          />
        ) : (
          <PublicMenuItem
            activeItem={activeItem}
            handleItemClick={handleItemClick}
          />
        )}
      </Container>
    </Menu>
  );
};

const PublicMenuItem = ({ activeItem, handleItemClick }) => {
  return (
    <Menu.Menu position="right">
      <SearchMenuItem />
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
  );
};
const PrivateMenuItem = ({ activeItem, handleItemClick }) => {
  const { logout } = useContext(AuthCtx);
  const history = useHistory();
  return (
    <>
      <Menu.Item
        name="timeline"
        active={activeItem === 'timeline'}
        onClick={handleItemClick}
        as={Link}
        to={ROUTES.TIMELINE}
      />
      <Menu.Menu position="right">
        <SearchMenuItem />
        <Menu.Item name="logout" onClick={() => logout(history)} />
      </Menu.Menu>
    </>
  );
};
const SearchMenuItem = () => (
  <Menu.Item>
    <Input icon="search" placeholder="Search..." />
  </Menu.Item>
);

PublicMenuItem.propTypes = PrivateMenuItem.propTypes = {
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
};

export { PublicMenuItem, PrivateMenuItem };

export default MenuBar;
