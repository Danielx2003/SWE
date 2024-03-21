import {React, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { IPContext } from "../App.js"

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import AdminUserGroupsModal from './AdminUserGroupsModal'
import { FormControl, InputLabel, MenuItem, Select, TableHead } from '@mui/material';

// Component for displaying the Users currently registered to the website,
// and for changing their permissions.
export default function AdminUserGroups({ currentUserPerms }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const IP = useContext(IPContext)

  useEffect(() => {
    // Get a user list (with pagination)
    const getUserRows = async () => {
        const response = await axios.get(
            `http://${IP}:8000/authentication/user-search/?page=${page + 1}&page_size=${rowsPerPage}`,
            { withCredentials: true }
        ) 
        .then((res) => {
          setRows(res.data.results)
        })
        .catch((err) => {
          if (err.response.status == 404) {
            alert("No more users past this page!")
            setPage(page - 1)
          }
        })
    }

    getUserRows()
  }, [rowsPerPage, page]) // Dependency array to ensure the page updates whenever
                          // rows per page or page number is changed

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className='admin-table-container table' sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow className='justify-content-between admin-table-header'>
            <th scope="col" className='p-4'>ID</th>
          </TableRow>
        </TableHead>
        <TableBody className='admin-table-body'> 
          {rows.map((row) => (
            <>
                <TableRow key={row.username} className='admin-table-row'>
                    <div>
                        <AdminUserGroupsModal row={row} perms={currentUserPerms} page={page} pageFunc={setPage} />
                    </div>
                </TableRow>
            </>
          ))}
        </TableBody>
        <TableFooter className='admin-table-footer'>
          <TableRow className='d-flex flex-row justify-content-end pt-2'>
            <FormControl variant='standard' className='flex-row'>
              <InputLabel id="demo-simple-select-standard-label">Page Size</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="5"
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
              <IconButton
                aria-label="previous page"
                onClick={() => setPage(page - 1)}
                disabled={page == 0}
              >
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton
                aria-label="next page"
                onClick={() => setPage(page + 1)}
              >
                <KeyboardArrowRight />
              </IconButton>
            </Box>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}