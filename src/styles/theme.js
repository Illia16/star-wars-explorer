import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        // color: '#FFE81F',
        // text: {
        //     colorPrimary: '#FFE81F'
        // },
        MuiContainer: {
            root: {
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                // colorPrimary: '#FFE81F',
                padding: '0 !important',
                alignItems: 'center',
            },
        },
        MuiList: {
            root: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '70vh',
                alignItems: 'center',
            }
        },
        MuiListItem: {
            root: {
                display: 'initial',
                width: '175px',
                margin: '5px 0',
                textAlign: "center",
                padding: '0 !important',
                // background: '#29292d',
            }
        },

        MuiAppBar: {
            root: {
                padding: '20px 0',
            },
            colorPrimary: {
                backgroundColor: '#29292d',
                color: '#FFE81F',
            },
            positionFixed: {
                position: 'static'
            }
        },
        MuiButton: {
            root: {
                backgroundColor: '#29292d', 
                color: '#FFE81F',
                '&:hover': {
                    backgroundColor: '#FFE81F', 
                    color: '#29292d',
                },
                margin: '20px'
            },
        },
        MuiTypography: {
            h5: {
                margin: '20px 0'
            }
        }
    },
});

export default theme;