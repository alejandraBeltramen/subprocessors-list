import { Snackbar as MUISnackbar } from '@mui/material';
import React from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = ({ children, ...otherProps }) => {
    return (
        <MUISnackbar
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            {...otherProps}
        >
            { children }
        </MUISnackbar>
    );
};

const SnackBarSeverityMsg = ({ severity='success', message, open, handleClose }) => {
    return (
        <Snackbar open={open} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                { message }
            </Alert>
        </Snackbar>
    );
};
export const SuccessSnackbar = (props) => (<SnackBarSeverityMsg {...props} />);
export const ErrorSnackbar = (props) => (<SnackBarSeverityMsg {...props} severity='error' />);

export default Snackbar;