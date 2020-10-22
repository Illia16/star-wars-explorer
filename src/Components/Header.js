// React
import React from 'react';

// Material UI
import AppBar from'@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

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