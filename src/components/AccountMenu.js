import React, { useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import fire from "./config/Fire";
import { Link } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import styled from "styled-components";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    fire.auth().signOut();
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        style={{ padding: "0", color: "rgba(210, 225, 243, 1)" }}
      >
        <AccountCircle size="large" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ProfileLink to="/profile">
          <MenuItem>Profile</MenuItem>
        </ProfileLink>
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;

const ProfileLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
