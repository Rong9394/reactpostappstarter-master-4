import useBoundStore from "../../store/Store";
import classes from "./Navbar.module.css";
import React from "react";
import { DrawerContext } from "../../Contexts/drawerContext";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export default () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const { close } = React.useContext(DrawerContext);

  const handleClick = (action) => {
    close();
    if (action) action();
  };


  const items = !user
    ? [
        <NavLink onClick={handleClick} className={classes.link} end to="/">
          Home
        </NavLink>,
        <NavLink onClick={handleClick} className={classes.link} to="/login">
          Login
        </NavLink>,
        <ThemeToggle></ThemeToggle>,
      ]
    : [
        <NavLink onClick={handleClick} className={classes.link} end to="/posts">
          Posts
        </NavLink>,
        <NavLink onClick={handleClick} end to="/posts/create">
          Create
        </NavLink>,
        <NavLink onClick={() => handleClick(logoutService)} to="/">
          Logout
        </NavLink>,
        <ThemeToggle></ThemeToggle>,  
      ];
  return [items];
};
