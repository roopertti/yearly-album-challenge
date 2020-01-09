import React from 'react';
import { Container } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

import Header from '../components/Header';

const NotFound: React.FC<RouteComponentProps> = ({staticContext = {}}) => {
    staticContext.statusCode = 404;
    return (
        <>
            <Header showLogin={false} />
            <Container>
                <h1>404</h1>
                <p>This page was not found :(</p>
            </Container>
        </>
    );
}

export default NotFound;