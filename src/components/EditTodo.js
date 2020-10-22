import React from 'react';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function EditTodo(props) {
    handleClickOpen = () => {
        setOpen(true);
    };

    handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div>
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Edit your todo
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Todo"
                    type="text"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </div>
    )
}