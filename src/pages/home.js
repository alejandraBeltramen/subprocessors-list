import React from 'react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { Typography } from '@mui/material';
import PageContainer from '../components/layout/PageContainer';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <PageContainer>
            <Card sx={{ textAlign: 'center' }}>
                <Typography variant="h5" color="primary">Code Challenge Home Page</Typography>
                <Typography variant="subtitle1">This is the resolution of the code challenge.</Typography>
                <br />
                <Typography variant="subtitle2" sx={{ paddingLeft: '10%', paddingRight: '10%'}}>
                    In order to simulate a real aplication, the Subprocessors Management Table was placed
                    within a page accesed by url on the path
                    <Typography variant="caption"> /subprocessors-management.</Typography>
                    You can manually input that path or click on the link below:
                </Typography>
                <Button size="small">
                    <Link to='/subprocessors-management'>
                        Go to Subprocessors Management page
                    </Link>
                </Button>
            </Card>
        </PageContainer>
    );
};

export default Home;