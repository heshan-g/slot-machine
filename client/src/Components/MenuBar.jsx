import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

import './playStyles.css';

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu secondary className='mnav'>
      <Menu.Menu position='right' className='logout'>
        <Menu.Item name='logout' onClick={logout} className='logoutText' />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu secondary className='mnav'>
      <Menu.Menu position='right' className='logout'>
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
          className='logoutText'
        />
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
          className='logoutText'
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}
