import React from "react";
import Card from '../UI/Card';
import Button from '../UI/Button';
import { pxToRem } from "../../theme/utils";
import { TableCell, TableRow } from '../UI/Table';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, Stack, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

/* Management table that allows CRUD operations on items */
const ManageItemsTable = ({
    title,
    onAddClick,
    onRemoveClick,
    onEditClick,
    addBtnLabel,
    editBtnLabel,
    removeBtnLabel,
    columnHeaders,
    rows,
}) => {
    return (
        <Card>
            <ManagementHeading title={title}>
                <Button onClick={onAddClick} variant="contained" size="small">
                    { addBtnLabel }
                </Button>
            </ManagementHeading>

            <TableContainer>
                <Table>
                    <TableHead>
                        <ManagementTableHeader columnHeaders={columnHeaders} />
                    </TableHead>
                    <TableBody>
                        <ManagementTableBody
                            rows={rows}
                            onEditClick={onEditClick}
                            onRemoveClick={onRemoveClick}
                            editBtnLabel={editBtnLabel}
                            removeBtnLabel={removeBtnLabel}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

const tableHeadingStyles = (theme) => ({
    marginBottom: pxToRem(20),
    [theme.breakpoints.down('sm')]: {
        marginBottom: pxToRem(10),
    },
});
const tableTitleStyles = {
    fontWeight: 600,
};
const tableHeadingBtns = (theme) => ({
    textTransform: 'none',
    textAlign: 'right',
    fontSize: pxToRem(20),
    [theme.breakpoints.down('sm')]: {
        fontSize: pxToRem(10),
    },
});
const ManagementHeading = ({ title, children }) => {
    const isSmallDevice = useMediaQuery('(max-width:599px)');

    return (
        <Grid container spacing={1} sx={tableHeadingStyles}>
            <Grid item xs={5}>
                <Typography variant={isSmallDevice ? 'subtitle1' : 'h5'} sx={tableTitleStyles}>{ title }</Typography>
            </Grid>
            <Grid item xs={7} sx={tableHeadingBtns}>
                { children }
            </Grid>
        </Grid>
    );
};

const ManagementTableHeader = ({ columnHeaders }) => {
    return (
        <TableRow>
            { columnHeaders.map((headerLabel) => (
                <TableCell key={headerLabel}>{ headerLabel }</TableCell>
            ))}
            {/* Extra column for Actions (empty header) */}
            <TableCell></TableCell> 
        </TableRow>
    );
};

const localizableStringsMgmntTableBody = {
    editLabel: 'Edit',
    removeLabel: 'Remove',
};
const actionBtnStyles = {
    color: '#5c5a5a',
};
const ManagementTableBody = ({ rows, onEditClick, onRemoveClick, editBtnLabel, removeBtnLabel }) => {
    const { editLabel, removeLabel } = localizableStringsMgmntTableBody;

    return (
        rows.map((row) => (
            <TableRow key={`${row.id}-row`}>
                {/* Cells for each property of the object */}
                { Object.keys(row).map((property) => {
                    if (property !== 'id') {
                        return (
                            <TableCell scope="row" key={`${row.id}-${property}-cell`}>
                                { row[property] }
                            </TableCell>
                        );
                    }
                })}

                {/* Extra cell for actions */}
                <ActionsCell>
                    <Button sx={actionBtnStyles} onClick={() => onEditClick(row)}>{editBtnLabel || editLabel }</Button>
                    <Button sx={actionBtnStyles} onClick={() => onRemoveClick(row)}>{removeBtnLabel || removeLabel }</Button>
                </ActionsCell>
            </TableRow>
        ))
    );
};

const ActionsCell = ({ children }) => {
    return (
        <TableCell>
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={0}
            >
                { children }
            </Stack>
        </TableCell>
    );
};

export default ManageItemsTable;