import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";
import AuthContext from "../utils/AuthContext";
import userIcon from "../assets/user-icon.png";

const AuthNav = () => {
  const [activeItem, setActiveItem] = useState();

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const { userName } = useContext(AuthContext);

  return (
    <div id="navbar">
      <Menu pointing secondary>
        <Menu.Item
          as={NavLink}
          id="nav-logo"
          to="/dashboard"
          name="5 Sherpas"
          onClick={handleItemClick}
        />

        <Menu.Menu position="right">
          <Menu.Item
            as={NavLink}
            to="/dashboard"
            id="dashboard-nav"
            name="Dashboard"
            active={activeItem === "dashboard"}
            onClick={handleItemClick}
          />

          <Menu.Item
            as={NavLink}
            to="/usersettings"
            name="User Settings"
            active={activeItem === "User Settings"}
            onClick={handleItemClick}
          >
            <Image id="user-icon" src={userIcon} size="mini" />
            {`Hi ${userName}`}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default AuthNav;
