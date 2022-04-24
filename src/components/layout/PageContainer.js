import React from 'react';
import { pxToRem } from '../../theme/utils';
import Container from '@mui/material/Container';

const pageContainerStyles = (theme) => ({
    paddingRight: pxToRem(176),
    paddingLeft: pxToRem(176),
    paddingTop: pxToRem(60),
    maxWidth: pxToRem(1440),

    [theme.breakpoints.down('md')]: {
        paddingRight: pxToRem(10),
        paddingLeft: pxToRem(10),
        paddingTop: pxToRem(15),
        maxWidth: '100%',
    },
});

export default function PageContainer({ children}) {
    return (
        <Container sx={pageContainerStyles}>
            { children }
        </Container>
    );
}