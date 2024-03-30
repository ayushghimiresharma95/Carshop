import React, { useState,useEffect} from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const EditFile = ({editRow,data}) => {
    const [open, setOpen] = useState(false)
    const [car, setCar] = useState({
        brand: data.brand, model: data.model, color: data.color, fuel:data.fuel, modelYear: data.modelYear, price: data.price
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
    useEffect(() =>{

    },[])
    const handleSubmit = () => {
        editRow(car,data._links.self.href)
       
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

   

    return (
        <div>
            <Button variant="outlined" color="success" size="small" onClick={handleClickOpen}>
                Edit Car
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
                        label="year"
                        value={car.modelYear}
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
                    <Button onClick={handleSubmit}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditFile
