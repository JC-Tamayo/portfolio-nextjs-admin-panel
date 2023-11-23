import { DataGrid, GridColDef } from "@mui/x-data-grid";

type DataTableProps = {
  columns: GridColDef[];
  loading: boolean;
  paginationModel: {
    page: number;
    pageSize: number;
  }
  rows: any[];
  handlePaginationModel: () => void;
  total: number;
};

const DataTable = (props: DataTableProps) => {
  const { columns, loading, paginationModel, handlePaginationModel, rows, total } = props;

  return (
    <div style={{width: '100%'}}>
      <DataGrid
        paginationMode="server"
        paginationModel={ paginationModel }
        pageSizeOptions={ [10, 20, 50, 100] }
        rowCount={ total }
        loading={ loading }
        columns={ columns }
        rows={ rows }
        disableColumnMenu
        sx={{
          '& .MuiDataGrid-columnHeader': {
           backgroundColor: "#36304a",
           color: "white",
           fontWeight: 700,
          },
          '& .MuiDataGrid-sortIcon': {
            color: '#fff',
          },
        }}
        onPaginationModelChange={ handlePaginationModel }
        />
    </div>
  );
};

export default DataTable;