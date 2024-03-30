import React, { useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddCar = ({saveData}) => {
    const [open, setOpen] = useState(false)
    const [car, setCar] = useState({
        brand: "", model: "", color: "", fuel: "",modelYear: "", price: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar(prevCar => ({
            ...prevCar,
            [name]: value
        }));
    }
    const handleSubmit = () => {
        saveData(car) 
        setCar({
            brand: "", model: "", color: "", fuel: "", modelYear: "", price: ""
        });
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

   

    return (
        <div>
            <Button variant="contained" style={{ margin: "20px" }} onClick={handleClickOpen}>
                Add Car
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add Car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="brand"
                        name="brand"
                        label="Brand"
                        onChange={handleChange}
                        value={car.brand}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="model"
                        name="model"
                        label="Model"
                        value={car.model}
                        onChange={handleChange}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        value={car.color}
                        onChange={handleChange}
                        margin="dense"
                        id="color"
                        name="color"
                        label="Color"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        value={car.fuel}
                        onChange={handleChange}
                        margin="dense"
                        id="fuel"
                        name="fuel"
                        label="Fuel"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        onChange={handleChange}
                        id="year"
                        name="modelYear"
                        label="Model Year"
                        value={car.year}
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        onChange={handleChange}
                        value={car.price}
                        id="price"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddCar
