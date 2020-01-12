import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { RootState } from '../reducers/index';
import { authenticateUser } from '../actions/userActions';

//interface HeaderReduxProps

const mapState = (state: RootState) => ({
    currentUser: state.user
});

const mapDispatch = (dispatch: any) => ({
    startAuth: () => dispatch(authenticateUser())
});

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

type HeaderProps = ReduxProps & {
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

const HeaderLayout: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title}>
                        Yearly Album Challenge
                    </Typography>
                    {children}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ showLogin = true, currentUser = null, startAuth }) => {
    if(!showLogin) {
        return <HeaderLayout />;
    }

    if(!currentUser) {
        return <HeaderLayout>
            <Button color="inherit" onClick={() => startAuth()}>Login</Button>
        </HeaderLayout>;
    }

    return <HeaderLayout>
        <p>Loggen id</p>
    </HeaderLayout>;
}

export default connector(Header);