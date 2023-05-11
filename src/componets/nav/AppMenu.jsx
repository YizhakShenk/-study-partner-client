import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import Logout from "@mui/icons-material/Logout";

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import UserDetailsContext from "../../context/UserDetailsContext";


export default function AppMenu({ setOpenLogIn }) {

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  const { user ,setUser} = useContext(UserContext);
  const { userDetails, } = useContext(UserDetailsContext);

  const navigae = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorUserMenu(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };
  const HandleProfilePage = () => {
    handleCloseUserMenu();
    navigae("/profile");
  };
  const handleAboutPage = () => {
    handleCloseUserMenu();
    navigae("/about");
  };
  const handleOpenLogIn = () => {
    setOpenLogIn(true);
    handleCloseUserMenu();
  };
  const handleLogOut = () => {
    handleCloseUserMenu();
    ((name) => {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    })("token");
    ((name) => {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    })("id");
    sessionStorage.removeItem("user");
    setUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="open user options">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {!user ? (
            <Avatar />
          ) : (
            <Avatar>
              {userDetails?.name
                ? userDetails.name.slice(0, 1).toUpperCase()
                : " "}
            </Avatar>
          )}
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorUserMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
      >
        {user ? (
          <Box>
            <MenuItem onClick={HandleProfilePage}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleAboutPage}>
              <ListItemIcon>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              About
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Log Out
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={handleOpenLogIn}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Log In
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleAboutPage}>
              <ListItemIcon>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              About
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
}
