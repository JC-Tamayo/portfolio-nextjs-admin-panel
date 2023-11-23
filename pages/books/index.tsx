import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import Box from '@mui/material/Box';
import Button  from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { GridColDef } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TextField  from '@mui/material/TextField';

import SearchIcon from '@mui/icons-material/Search';

import BreadCrumbs from '@/components/BreadCrumbs';
import DataTable from '@/components/DataTable';
import PanelLayout from '@/components/PanelLayout';

import { Book, BookList } from '@/interfaces/Book';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'author', headerName: 'Author', flex: 1 },
  { field: 'publisher', headerName: 'Publisher', flex: 1 },
  { field: 'publishDate', headerName: 'Publication Date', flex: 1 },
  { field: 'createdAt', headerName: 'Created At', flex: 1 },
];

const filterInitalState = {
  title: '',
  author: '',
  publisher: '',
  publishDate: '',
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [inputs, setInputs] = useState(filterInitalState);
  const [filters, setFilters] = useState(filterInitalState);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);

  const findBooks = useCallback(async () => {
    setLoading(true);
    const response = await axios.post<BookList>('/api/books', {
      ...paginationModel,
      ...filters,
    });
    setBooks(response.data.data);
    setTotal(response.data.total);
    setLoading(false);
  }, [paginationModel, filters]);

  const filterHandler = () => {
    setFilters(inputs);
  };
  
  useEffect(() => {
    findBooks();
  }, [findBooks]);

  return (
    <PanelLayout>
      <BreadCrumbs routes={[
        {
          name: 'Book List',
          link: '/books'
        }
      ]} />
      <Box sx={{ marginBottom: 10,  width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField 
              label="Title"
              sx={{ width: '100%' }}
              variant="outlined"
              value={ inputs.title }
              onChange={ (event) => setInputs({ ...inputs, title: event.target.value }) }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField 
              label="Author"
              sx={{ width: '100%' }}
              variant="outlined"
              value={ inputs.author }
              onChange={ (event) => setInputs({ ...inputs, author: event.target.value }) }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField 
              label="Publisher"
              sx={{ width: '100%' }}
              variant="outlined"
              value={ inputs.publisher }
              onChange={ (event) => setInputs({ ...inputs, publisher: event.target.value }) }
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <TextField 
                sx={{ width: '100%' }}
                variant="outlined"
                type="date"
                value={ inputs.publishDate}
                size="small"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" onClick={filterHandler}>
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <DataTable 
        columns={ columns } 
        loading={ loading } 
        rows={ books } 
        total={ total }
        paginationModel={ paginationModel }
        handlePaginationModel={ () => setPaginationModel(paginationModel)}
      />
    </PanelLayout>
  )
};

export default BookList;