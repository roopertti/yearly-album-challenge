import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@material-ui/core';

import Header from './Header';

const Layout: React.FC = (props) => {
    return (
        <>
            <Header />
            <Container>{props.children}</Container>
        </>
    );
}

export default Layout;