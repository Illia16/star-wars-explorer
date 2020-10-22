import React from 'react';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import AppBar from'@material-ui/core/AppBar';

function Header() {
    return (
        <AppBar>
            <Typography variant="h1" component="h1" align="center" >
                Star Wars Explorer
            </Typography>
        </AppBar>
    )
};

export default Header;