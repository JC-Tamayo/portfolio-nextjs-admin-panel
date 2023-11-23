import React, { ReactNode, useState } from 'react';
import Box from '@mui/material/Box';

import Sidebar from '@/components/Sidebar';
import TopMenuBar from '@/components/TopMenuBar';

import { colorConfig, sizeConfig } from '@/config';

interface MainContentProps {
  children: ReactNode;
}

const PanelLayout: React.FC<MainContentProps> = ({ children }) => {
  const [sidebarStatus, setSidebarStatus] = useState(true);
  return (
    <Box sx={{ display: "flex" }}>
      <TopMenuBar isSidebarOpen={ sidebarStatus } handleSidebarOpen={ () => setSidebarStatus(!sidebarStatus) }/>
      <Sidebar isSidebarOpen={ sidebarStatus } handleSideBarClose={ () => setSidebarStatus(false) }/>
      
      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: sizeConfig.sidebar.width,
          minHeight: "100vh",
          backgroundColor: colorConfig.mainBg
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PanelLayout;