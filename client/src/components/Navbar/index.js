import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import './style.css';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div id='navbar'>
      <Menu pointing secondary>
        <Link to='/'>
          <Menu.Item
            name='5 Sherpas'
            active={activeItem === 'logout'}
            onClick={handleItemClick}
          />
        </Link>

        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item
              name='login'
              active={activeItem === 'home'}
              onClick={handleItemClick}
            />
          </Link>
          <Link to='/register'>
            <Menu.Item
              name='register'
              active={activeItem === 'messages'}
              onClick={handleItemClick}
            />
          </Link>
          <Link to='/dashboard'>
            <Menu.Item
              name='video camera'
              active={activeItem === 'video camera'}
              onClick={handleItemClick}
            >
              <Icon name='user' inverted />
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Navbar;
