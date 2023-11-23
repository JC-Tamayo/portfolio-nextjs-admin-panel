import React from 'react';

import Box from '@mui/material/Box';

import BreadCrumbs from '@/components/BreadCrumbs';
import PanelLayout from '@/components/PanelLayout';

const Books = () => {  
  return (
    <PanelLayout>
      <BreadCrumbs routes={[
        {
          name: 'Book List',
          link: '/books'
        },
        {
          name: 'Add Book',
          link: '/books/add'
        }
      
      ]} />
      <Box></Box>
    </PanelLayout>
  )
};

export default Books;