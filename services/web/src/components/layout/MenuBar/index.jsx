import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from '@apollo/client';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Icon, Input, Menu } from 'semantic-ui-react';

import { AuthContext } from 'contextAPI';
import * as ROUTES from 'constants/routes';

const MenuBar = () => {
  const { authUser } = useContext(AuthContext);
  const { pathname } = useLocation();

  const path = pathname === '/' ? 'login' : pathname.split('/')[1];
  const [activeItem, setactiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setactiveItem(name);

  return (
    <Menu pointing secondary size="massive" id="navbar">
      <Menu.Item>
        <Icon name="twitter" size="large" color="orange" />
      </Menu.Item>
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
  const { logout } = useContext(AuthContext);
  const client = useApolloClient();
  const history = useHistory();

  const handleLogout = async () => {
    logout();
    await client.clearStore();
    history.push(ROUTES.LOGIN);
  };

  return (
    <>
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to={ROUTES.HOME}
      />
      <Menu.Menu position="right">
        <SearchMenuItem />
        <Menu.Item name="logout" onClick={handleLogout} />
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
