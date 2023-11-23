import { useUser, } from '@auth0/nextjs-auth0/client';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import PanelLayout from '@/components/PanelLayout';
import BreadCrumbs from '@/components/BreadCrumbs';

const Index = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <CircularProgress />;
  if (error) return <div>{error.message}</div>;
  
  if (user) {
    return (
      <PanelLayout>
        <BreadCrumbs/>
          <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome {user.name}!
            </Typography>
          </Box>
      </PanelLayout>
    );
  }
}

export default Index;