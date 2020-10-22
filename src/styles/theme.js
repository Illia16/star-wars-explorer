import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        // entire page
        MuiContainer: {
            root: {
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                padding: '0 !important',
                alignItems: 'center',
            },
        },
        // UL
        MuiList: {
            root: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                padding: '40px',
            }
        },
        // UL LI
        MuiListItem: {
            root: {
                color: '#FFE81F',
                display: 'initial',
                width: '200px',
                margin: '5px 0',
                textAlign: "center",
                padding: '0 !important',
            }
        },
        // Top banner with h1
        MuiAppBar: {
            root: {
                padding: '20px 0',
                textTransform: 'capitalize',
            },
            colorPrimary: {
                backgroundColor: '#29292d',
            },
            positionFixed: {
                position: 'static'
            }
        },
        // button(next, previous page)
        MuiButton: {
            root: {
                backgroundColor: '#29292d', 
                color: '#FFE81F',
                '&:hover': {
                    backgroundColor: '#FFE81F', 
                    color: '#29292d',
                },
                margin: '20px',
                fontSize: '1.3rem',
            },
        },
        // headings
        MuiTypography: {
            root: {
                color: '#FFE81F',
            },
            h2: {
                marginTop: 'auto'
            }
        },
        // subResults card background
        MuiCard: {
            root: {
                margin: 'auto',
                background: '#29292d',
            }
        },
    },
});

export default theme;