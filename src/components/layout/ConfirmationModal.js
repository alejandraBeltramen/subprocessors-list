import React from "react";
import Modal, { ModalActions, ModalTitleText } from '../UI/Modal';
import Button from '../UI/Button';
import { CardContent } from '@mui/material';

const localizableStrings = {
    titleLabel: 'Confirmation',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
};
const ConfirmationModal = ({
    onClose,
    onConfirm,
    onCancelLabel,
    onConfirmLabel,
    title,
    children,
    ...otherProps
}) => {
    const { titleLabel, cancelLabel, confirmLabel } = localizableStrings;
    return (
        <Modal onClose={onClose} {...otherProps}>
            <CardContent>
                <ModalTitleText>{ title || titleLabel }</ModalTitleText>
                <div>{ children }</div>
            </CardContent>
            <ModalActions>
                <Button onClick={onClose} size="small">
                    { onCancelLabel || cancelLabel }
                </Button>
                <Button variant="contained" onClick={onConfirm} size="small">
                    { onConfirmLabel || confirmLabel }
                </Button>
            </ModalActions>
        </Modal>
    );
};

export default ConfirmationModal;