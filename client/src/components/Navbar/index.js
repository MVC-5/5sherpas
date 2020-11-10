import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "./style.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div id="navbar">
      <Menu pointing secondary>
        <Menu.Item
          as={NavLink}
          id="nav-logo"
          to="/"
          name="5 Sherpas"
          onClick={handleItemClick}
        />

        <Menu.Menu position="right">
          <Menu.Item
            as={NavLink}
            to="/register"
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={NavLink}
            to="/login"
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Navbar;
