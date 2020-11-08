// React
import React from 'react';

// Material UI
import AppBar from'@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

function Header(props) {
    const { title } = props;
    return (
        <AppBar>
            <Typography variant="h1" component="h1" align="center" >
                {  !title ? 'Star Wars Explorer' : title }
            </Typography>
        </AppBar>
    )
};

export default Header;