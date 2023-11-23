import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import BookIcon from '@mui/icons-material/Book';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import { colorConfig, sizeConfig } from '@/config';
import Logo from '@/assets/logo.png';

interface SideBarProps {
  isSidebarOpen: boolean;
  handleSideBarClose: () => void;
}

const Sidebar = (props: SideBarProps) => {
  const [isBookSubMenuOpen, setIsBookSubMenuOpen] = useState(false);

  return (
    <Drawer
      anchor="left"
      open={ props.isSidebarOpen }
      onClose={ props.handleSideBarClose }
      variant="persistent"
      sx={{
        width: props.isSidebarOpen ? sizeConfig.sidebar.width : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfig.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfig.sidebar.bg,
          color: colorConfig.sidebar.color
        }
      }}
    >
      <List sx={{ paddingTop: 0 }}>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <Avatar src={Logo.src} alt="logo" />
          </Stack>
        </Toolbar>
        <ListItemButton href="/">
          <ListItemIcon>
            <HomeIcon sx={{ color: colorConfig.topbar.color }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={() => setIsBookSubMenuOpen(!isBookSubMenuOpen)}>
          <ListItemIcon>
            <BookIcon sx={{ color: colorConfig.topbar.color }} />
          </ListItemIcon>
          <ListItemText primary="Books" />
          {isBookSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={ isBookSubMenuOpen } timeout="auto" unmountOnExit>
          <ListItemButton 
            href="/books/"
            sx={sizeConfig.nestedSidebarItems}
          >
            <ListItemIcon>
              <BookIcon sx={{ color: colorConfig.topbar.color }} />
            </ListItemIcon>
            <ListItemText primary="Book List" />
          </ListItemButton>
          <ListItemButton 
            href="/books/add"
            sx={sizeConfig.nestedSidebarItems}
          >
            <ListItemIcon>
              <LibraryAddIcon sx={{ color: colorConfig.topbar.color }} />
            </ListItemIcon>
            <ListItemText primary="Add Book" />
          </ListItemButton>
        </Collapse>
      </List>    
    </Drawer>
  );
};

export default Sidebar;