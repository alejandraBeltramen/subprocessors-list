import React, { useEffect, useState } from "react";
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/UI/Button';
import Modal, { ModalTitleText, ModalActions } from '../components/UI/Modal';
import ConfirmationModal from "../components/layout/ConfirmationModal";
import ManageItemsTable from "../components/layout/ManageItemsTable";
import { CardContent, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
    getSubprocessors as getSubprocessorsService,
    removeSubprocessor as removeSubprocessorService,
    addSubprocessor as addSubprocessorService,
    editSubprocessor as editSubprocessorService,
} from "../services/SubprocoessorService";
import Subprocessor from "../models/subprocessor";

// They could be localized to different languages in a single place
const localizableStrings = {
    pageTitle: 'Subprocessors',
    fields: {
        nameLabel: 'Name',
        purposeLabel: 'Purpose',
        locationLabel: 'Location',
    },
    addSubprocessorBtnLabel: 'Add Subprocessor',
    confirmRemovalText: 'Are you sure that you want to remove it?',
    addEditValidationMsg: "Please, enter a valid",
    cancelLabel: 'Cancel',
    saveLabel: 'Save',
    addSubprocessorTitle: 'Add Subprocessor',
    editSubprocessorTitle: 'Edit Subprocessor',
};

const SubprocessorsManagementPage = () => {
    const { pageTitle, fields, confirmRemovalText, addSubprocessorBtnLabel } = localizableStrings;
    const { nameLabel, purposeLabel, locationLabel } = fields;
    
    const [ subprocessors, setSubproecessors ] = useState([]);
    const [ selectedSubprocessor, setSelectedSubprocessor ] = useState(null);
    const [ openRemoveModal, setOpenRemoveMoval ] = useState(false);
    const [ openAddEditSubprocessorModal, setOpenAddEditSubprocessorModal ] = useState(false);

    useEffect(() => {
        // TODO simulate an async fn
        const subprocessorsLS = getSubprocessorsService();
        if(subprocessorsLS) setSubproecessors(subprocessorsLS);
    }, []); // TODO define the dependencies....

    /* Modal open/close handlers */
    const closeRemoveModalHandler = () => {
        setSelectedSubprocessor(null);
        setOpenRemoveMoval(false);
    };
    const closeAddEditModalHandler = () => {
        setSelectedSubprocessor(null);
        setOpenAddEditSubprocessorModal(false);
    };
    const removeClickHandler = (subprocessor) => {
        setSelectedSubprocessor(subprocessor);
        setOpenRemoveMoval(true);
    };
    const addClickHandler = () => setOpenAddEditSubprocessorModal(true);
    const editClickHandler = (subprocessor) => {
        setSelectedSubprocessor(subprocessor);
        setOpenAddEditSubprocessorModal(true);
    };

    /* Add, Edit, Remove handlers */
    const removalConfirmationHandler = () => {
        // TODO execute async fn to remove it from the local storage
        const newSubprocessorsList = removeSubprocessorService(selectedSubprocessor);
        setSubproecessors(newSubprocessorsList);
        closeRemoveModalHandler();
    };
    const addEditSubmitHandler = (formValues) => {
        let newSubprocessorsList;
        if(selectedSubprocessor) {
            // perform Edit
            const updatedSubprocessor = { id: selectedSubprocessor.id, ...formValues };
            newSubprocessorsList = editSubprocessorService(updatedSubprocessor);
        } else {
            // perform Add
            const { name, purpose, location } = formValues;
            const newSubprocessor = new Subprocessor(name, purpose, location);
            newSubprocessorsList = addSubprocessorService(newSubprocessor);
        }
        setSubproecessors(newSubprocessorsList);
        closeAddEditModalHandler();
    };

    return(
        <PageContainer>
            <ManageItemsTable
                title={pageTitle}
                onAddClick={addClickHandler}
                onRemoveClick={removeClickHandler}
                onEditClick={editClickHandler}
                addBtnLabel={addSubprocessorBtnLabel}
                columnHeaders={[ nameLabel, purposeLabel, locationLabel ]}
                rows={subprocessors}
            >
            </ManageItemsTable>

            { openRemoveModal && (
                <ConfirmationModal
                    open={openRemoveModal}
                    onClose={closeRemoveModalHandler}
                    onConfirm={removalConfirmationHandler}
                >
                    <Typography variant="body2">{ confirmRemovalText }</Typography>
                </ConfirmationModal>
            )}

            { openAddEditSubprocessorModal && (
                <AddEditSubprocessorModal
                    open={openAddEditSubprocessorModal}
                    subprocessor={selectedSubprocessor}
                    onSave={addEditSubmitHandler}
                    onClose={closeAddEditModalHandler}
                />
            )}
        </PageContainer>
    );
};

const AddEditSubprocessorModal = ({ open, subprocessor, onSave, onClose }) => {
    const {
        addEditValidationMsg,
        cancelLabel,
        saveLabel,
        fields,
        addSubprocessorTitle,
        editSubprocessorTitle,
    } = localizableStrings;
    const { nameLabel, purposeLabel, locationLabel } = fields;

    const [ nameValue, setNameValue ] = useState(subprocessor?.name || '');
    const [ purposeValue, setPurposeValue ] = useState(subprocessor?.purpose || '');
    const [ locationValue, setLocationValue ] = useState(subprocessor?.location || '');
    const [ isNameValid, setIsNameValid ] = useState(true);
    const [ isPurposeValid, setIsPurposeValid ] = useState(true);
    const [ isLocationValid, setIsLocationValid ] = useState(true);

    const submitHandler = (ev) => {
        ev.preventDefault();
        onSave({ name: nameValue, purpose: purposeValue, location: locationValue });
    };

    const fieldChangeHandler = (ev, setFieldValueFn, setFieldValidityFn) => {
        const value = ev.target.value;
        setFieldValueFn(value);
        setFieldValidityFn(!isEmpty(value));
    };

    const isFormValid = () => (
        !isEmpty(nameValue) && !isEmpty(purposeValue) && !isEmpty(locationValue)
    );

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={submitHandler}>
                <CardContent>
                    <ModalTitleText variant="h6">
                        { subprocessor ?  editSubprocessorTitle : addSubprocessorTitle }
                    </ModalTitleText>
                    <Stack 
                        direction="column"
                        justifyContent="center"
                        alignItems="left"
                        spacing={2}
                    >
                        <TextField
                            id="name"
                            label={nameLabel}
                            defaultValue={subprocessor?.name}
                            error={!isNameValid}
                            helperText={!isNameValid && `${addEditValidationMsg} ${nameLabel}` }
                            variant="standard"
                            required
                            onChange={(ev) => fieldChangeHandler(ev, setNameValue, setIsNameValid)}
                        />

                        <TextField
                            id="purpose"
                            label={purposeLabel}
                            defaultValue={subprocessor?.purpose}
                            error={!isPurposeValid}
                            helperText={!isPurposeValid && `${addEditValidationMsg} ${purposeLabel}` }
                            variant="standard"
                            required
                            onChange={(ev) => fieldChangeHandler(ev, setPurposeValue, setIsPurposeValid)}
                        />

                        <TextField
                            id="location"
                            label={locationLabel}
                            defaultValue={subprocessor?.location}
                            error={!isLocationValid}
                            helperText={!isLocationValid && `${addEditValidationMsg} ${locationLabel}` }
                            variant="standard"
                            required
                            onChange={(ev) => fieldChangeHandler(ev, setLocationValue, setIsLocationValid)}
                        />
                    </Stack>
                </CardContent>
                <ModalActions>
                    <Button onClick={onClose} size="small">
                        { cancelLabel }
                    </Button>
                    <Button variant="contained" type="submit" size="small" disabled={!isFormValid()}>
                        { saveLabel }
                    </Button>
                </ModalActions>
            </form>
        </Modal>
    );
};

// This function could potentially be moved to a utils file for form operations and validations
const isEmpty = (value) => value.trim() === '';

export default SubprocessorsManagementPage;