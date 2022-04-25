import MUITableCell, { tableCellClasses } from '@mui/material/TableCell';
import MUITableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { pxToRem } from '../../theme/utils';

export const TableRow = styled(MUITableRow)(() => ({
    // hide last border
    '&:last-child td': {
      border: 0,
    },
}));

export const TableCell = styled(MUITableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 700,
        padding: pxToRem(8),
    },
    [`&.${tableCellClasses.body}`]: {
        padding: pxToRem(8),
        borderBottom: '1px solid rgb(247 245 245)',
    },
}));
