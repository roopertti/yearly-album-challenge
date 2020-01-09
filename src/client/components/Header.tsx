import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface HeaderProps {
    showLogin?: boolean;
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1
        },
        title: {
            flexGrow: 1
        }
    })
);

const Header: React.FC<HeaderProps> = ({showLogin = true}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title}>
                        Yearly Album Challenge
                    </Typography>
                    {
                        showLogin ?
                        <Button color="inherit">Login</Button> :
                        null
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;