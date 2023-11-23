import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { colorConfig, sizeConfig } from "@/config";

interface TopMenuBarProps {
  isSidebarOpen: boolean;
  handleSidebarOpen: () => void;
}

const TopMenuBar = (props: TopMenuBarProps) => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event: any) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <AppBar 
        position="fixed"
        sx={{
          width: props.isSidebarOpen ? `calc(100% - ${sizeConfig.sidebar.width})` : '100%',
          ml: sizeConfig.sidebar.width,
          boxShadow: "unset",
          backgroundColor: colorConfig.topbar.bg,
          color: colorConfig.topbar.color
        }}
      >
        <Toolbar>
          <IconButton onClick={ props.handleSidebarOpen }>
            <MenuIcon sx={{ color: colorConfig.topbar.color }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemButton href="/api/auth/logout">
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
}

export default TopMenuBar;