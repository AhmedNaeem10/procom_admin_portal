import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { getData, collectPayemnt } from './apis';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'fullname',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  {
    field: 'contact',
    headerName: 'Contact',
    width: 150,
    editable: true,
  },
  {
    field: 'teams_registered',
    headerName: 'Teams registered',
    width: 160,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 100,
  },
  {
    field: "action",
    headerName: "Collect payment",
    sortable: false,
    width: 200,
    renderCell: (params) => {
      const onClick = async (e) => {
        e.stopPropagation();
        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        let amount = prompt("Enter amount:");
        if(amount){
          await collectPayemnt(thisRow.id, amount)
        }
      };
      return <Button variant="contained" onClick={onClick}>Collect</Button>;
    }
  }
];


export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await getData();
      setData(response);
    }
    fetchData();
  }, [data])
  return (
    <div style={{ alignSelf: "center", paddingLeft: 50, paddingRight: 50, marginTop: 30 }}>
      <h1 style={{ fontWeight: "bold" }}>Ambassador Data</h1>
      <Box sx={{ height: window.innerHeight - 100, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}
