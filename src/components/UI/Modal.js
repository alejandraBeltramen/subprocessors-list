import React from "react";
import MUIModal from '@mui/material/Modal';
import Card from './Card';
import { Box } from "@mui/system";
import { CardActions, Fade, Stack, Typography } from "@mui/material";
import { pxToRem } from "../../theme/utils";

const modalContainerStyles = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
    padding: pxToRem(32),
    [theme.breakpoints.down('sm')]: {
        padding: pxToRem(15),
    },
    [theme.breakpoints.up('md')]: {
        width: 400,
    },
});
const Modal = ({ open, children, ...otherProps }) => {
    return (
        <MUIModal open={open} {...otherProps}>
            <Fade in={open}>
                <Box>
                    <Card sx={modalContainerStyles}>
                        <div> { children } </div>
                    </Card>
                </Box>
            </Fade>
        </MUIModal>
    );
};

const modalTitleTextStyles = (theme) => ({
    marginBottom: pxToRem(10),
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
        fontSize: pxToRem(15),
        marginBottom: pxToRem(5),
    }
});
export const ModalTitleText = ({ children, ...otherProps }) => {
    return (
        <Typography variant="h6" sx={modalTitleTextStyles} {...otherProps}>
            { children }
        </Typography>
    );
}

const modalActionsStyles = {
    justifyContent: 'flex-end',
};
export const ModalActions = ({ children }) => {
    return (
        <CardActions sx={modalActionsStyles}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                { children }
            </Stack>
        </CardActions>
    );
};

export default Modal;