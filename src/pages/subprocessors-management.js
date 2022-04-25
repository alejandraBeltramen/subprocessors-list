import React, { useEffect, useState } from "react";
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/UI/Button';
import Modal, { ModalTitleText, ModalActions } from '../components/UI/Modal';
import ConfirmationModal from "../components/layout/ConfirmationModal";
import ManageItemsTable from "../components/layout/ManageItemsTable";
import { CardContent, Stack, Typography } from '@mui/material';
import {
    getSubprocessors as getSubprocessorsService,
    removeSubprocessor as removeSubprocessorService,
    addSubprocessor as addSubprocessorService,
    editSubprocessor as editSubprocessorService,
} from "../services/SubprocoessorService";
import Subprocessor from "../models/subprocessor";
import { ErrorSnackbar, SuccessSnackbar } from "../components/UI/Snackbar";
import { useForm, useWatch } from 'react-hook-form';
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

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
    cancelLabel: 'Cancel',
    saveLabel: 'Save',
    addSubprocessorTitle: 'Add Subprocessor',
    editSubprocessorTitle: 'Edit Subprocessor',
    successMessage: 'Changes saved successfully',
    errorMessage: 'Something went wrong! Please, try again.',
    fieldRequiredMsg: 'This field is required',
};

const SubprocessorsManagementPage = () => {
    const {
        pageTitle,
        fields,
        confirmRemovalText,
        addSubprocessorBtnLabel,
        successMessage,
        errorMessage,
    } = localizableStrings;
    const { nameLabel, purposeLabel, locationLabel } = fields;

    const [ subprocessors, setSubproecessors ] = useState([]);
    const [ selectedSubprocessor, setSelectedSubprocessor ] = useState(null);
    const [ openRemoveModal, setOpenRemoveMoval ] = useState(false);
    const [ openAddEditSubprocessorModal, setOpenAddEditSubprocessorModal ] = useState(false);
    const [ isSuccessSnackbarOpen, setIsSuccessSnackbarOpen ] = useState(false);
    const [ isErrorSnackbarOpen, setIsErrorSnackbarOpen ] = useState(false);

    useEffect(() => {
        try {
            const subprocessorsLS = getSubprocessorsService();
            if(subprocessorsLS) setSubproecessors(subprocessorsLS);
        } catch(e) {
            setIsErrorSnackbarOpen(true);
        }
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
        try {
            const newSubprocessorsList = removeSubprocessorService(selectedSubprocessor);
            setSubproecessors(newSubprocessorsList);
            setIsSuccessSnackbarOpen(true);
        } catch(e) {
            setIsErrorSnackbarOpen(true);
        }
        closeRemoveModalHandler();
    };
    const addEditSubmitHandler = (formValues) => {
        let newSubprocessorsList;
        try {
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
            setIsSuccessSnackbarOpen(true);
        } catch(e) {
            setIsErrorSnackbarOpen(true);
        }
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
            <SuccessSnackbar
                open={isSuccessSnackbarOpen}
                handleClose={() => setIsSuccessSnackbarOpen(false)}
                message={successMessage}
            />
            <ErrorSnackbar
                open={isErrorSnackbarOpen}
                handleClose={() => setIsErrorSnackbarOpen(false)}
                message={errorMessage}
            />
        </PageContainer>
    );
};

const AddEditSubprocessorModal = ({ open, subprocessor, onSave, onClose }) => {
    const {
        cancelLabel,
        fields,
        addSubprocessorTitle,
        editSubprocessorTitle,
        fieldRequiredMsg,
    } = localizableStrings;
    const { nameLabel, purposeLabel, locationLabel } = fields;
    const formContext = useForm({
        defaultValues: {
            name: subprocessor?.name || '',
            purpose: subprocessor?.purpose || '',
            location: subprocessor?.location || '',
        },
        mode: 'all', // it will trigger validations onChange and onBlur
    });
    const { handleSubmit } = formContext;

    const submitHandler = handleSubmit((formData) => {
        onSave(formData);
    });

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <FormContainer
                formContext={formContext}
                handleSubmit={submitHandler}
            >
                <CardContent>
                    <ModalTitleText variant="h6" id="modal-title">
                        { subprocessor ?  editSubprocessorTitle : addSubprocessorTitle }
                    </ModalTitleText>
                    <Stack 
                        direction="column"
                        justifyContent="center"
                        alignItems="left"
                        spacing={2}
                        >
                            <TextFieldElement
                                name="name"
                                label={nameLabel}
                                parseError={() => fieldRequiredMsg}
                                required
                            />
                            <TextFieldElement
                                name="purpose"
                                label={purposeLabel}
                                parseError={() => fieldRequiredMsg}
                                required
                            />
                            <TextFieldElement
                                name="location"
                                label={locationLabel}
                                parseError={() => fieldRequiredMsg}
                                required
                            />
                        </Stack>
                </CardContent>
                <ModalActions>
                    <Button onClick={onClose} size="small">
                        { cancelLabel }
                    </Button>
                    <SubmitButton />
                </ModalActions>
            </FormContainer>
        </Modal>
    );
};

const SubmitButton = () => {
    const { saveLabel } = localizableStrings;
    const [ name, purpose, location ] = useWatch({ name: [ 'name', 'purpose', 'location'] });
    console.log(`name: ${name} | purpose: ${purpose} | location: ${location}`)

    return (
        <Button variant="contained" type="submit" size="small" disabled={!(name && purpose && location)}>
            { saveLabel }
        </Button>
    );
};

export default SubprocessorsManagementPage;