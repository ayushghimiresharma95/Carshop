import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddCar from './AddCar';
import EditFile from './EditFile';

const ListCar = () => {
    const [carList, setCarList] = useState([]);
    const topGrid = useRef < AgGridReact > (null);
    const [open, setOpen] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    

    const deleteRow = (row) => {
        console.log(row.data.id)
        if (window.confirm("Are You Sure ?")) {
            fetch(row.data._links.self.href, { method: "DELETE" })
                .then(response => {
                    if (response.ok) {
                        fetchList();
                    } else {
                        console.error('Failed to delete row:', response.statusText);
                    }
                })
                .catch(error => console.error('Error deleting row:', error));
        }
    };

    const editRow = (carData,link) => {
        fetch(link, {
            method: "PUT",
            body: JSON.stringify(carData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    setSnackbarMessage('Car Edited successfully');
                    setOpenSnackbar(true);
                    fetchList();
                } else {
                    throw new Error(`Failed to Edit car: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error('Error Edit car:', error);
                setSnackbarMessage('Failed to Edit car');
                setOpenSnackbar(true);
            });
    }
    const handleSubmit = (car) => {
        fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {
            method: "POST",
            body: JSON.stringify(car),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    setSnackbarMessage('Car added successfully');
                    setOpenSnackbar(true);
                    fetchList();
                } else {
                    throw new Error(`Failed to add car: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error('Error adding car:', error);
                setSnackbarMessage('Failed to add car');
                setOpenSnackbar(true);
            });
    }
    const columnDefs = [
        { field: "brand", filter: true, cellStyle: { textAlign: 'center' } },
        { field: "model", filter: true, cellStyle: { textAlign: 'center' } },
        { field: "color", filter: true, cellStyle: { textAlign: 'center' } },
        { field: "fuel", filter: true, cellStyle: { textAlign: 'center' } },
        { field: "modelYear", filter: true, cellStyle: { textAlign: 'center' } },
        { field: "price", filter: true, cellStyle: { textAlign: 'center' } },
        {
            headerName: "Delete",
            cellRenderer: (params) => <Button color="error" onClick={() => deleteRow(params)}>Delete</Button>,
            width: 150,
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName: "Delete",
            cellRenderer: (params) => <EditFile  editRow={editRow} data={params.data}>Edit</EditFile>,
            width: 150,
            cellStyle: { textAlign: 'center' }
        }
    ];

    const fetchList = async () => {
        try {
            const data = await fetch("https://carrestservice-carshop.rahtiapp.fi/cars");
            const response = await data.json();
            const carlist = response._embedded.cars;
            setCarList(carlist);
        } catch (error) {
            console.error('Error fetching car list:', error);
        }
    };
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='ag-theme-alpine' style={{ height: '800px', width: '100%', textAlign: 'center' }}>
            <AddCar saveData={handleSubmit} />
            <AgGridReact rowData={carList} columnDefs={columnDefs} alignedGrids={[topGrid]}  pagination={true} suppressRowClickSelection={true} groupSelectsChildren={true}/>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
};

export default ListCar;
