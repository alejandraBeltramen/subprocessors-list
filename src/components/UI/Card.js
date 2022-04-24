import MUICard from '@mui/material/Card';
import { pxToRem } from "../../theme/utils";
import { styled } from "@mui/system";

const Card = styled(MUICard)(({ theme }) => ({
    padding: pxToRem(20),
    [theme.breakpoints.down('sm')]: {
        padding: pxToRem(10),
    },
}));

export default Card;