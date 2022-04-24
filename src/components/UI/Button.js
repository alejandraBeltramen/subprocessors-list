import MUIButton from '@mui/material/Button';
import { styled } from "@mui/system";

const Button = styled(MUIButton)(() => ({
    textTransform: 'none',
    fontWeight: 600,
}));

export default Button;