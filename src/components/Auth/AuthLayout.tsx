import * as React from 'react';
import LoginForm from './LoginForm';
import { Box, CircularProgress, Container, createMuiTheme, LinearProgress, makeStyles, Snackbar, ThemeProvider } from '@material-ui/core';
import * as sdk from 'webnative';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PhotoUpload } from '../Photos/PhotoUpload';
import PhotoGalleryGrid from '../Photos/PhotoGalleryGrid';
import usePhotos, { PublishingState } from '../Photos/usePhotos';

const AuthLayout: React.FC = () => {
    const {addPhotos, photos, state, publishing, setPublishing} = usePhotos();

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const theme = createMuiTheme({
        palette: {
            type: prefersDarkScheme.matches ? 'dark' : 'light',
            background: {
                default: prefersDarkScheme.matches ? '#222' : '#fafafa'
            }
        }
    });

    const useStyles = makeStyles(theme => ({
        '@global': {
            '@keyframes fadeIn': {
                from: {opacity: 0},
                to: {opacity: 1},
            },
        },
        box: {
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        progress: {
            opacity: publishing.valueOf() === PublishingState.started.valueOf() ? 1 : 0,
            animation: `$fadeIn .325s ${theme.transitions.easing.easeInOut}`,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
        },
        successAlert: {
            ...theme.typography.body1,
            backgroundColor: theme.palette.success.main,
            borderColor: theme.palette.success.main,
            color: theme.palette.common.white,
            display: 'flex',
            paddingTop: theme.spacing(),
            paddingBottom: theme.spacing(),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            borderRadius: 4,
            letterSpacing: '0.01071em',
        }
    }))

    const classes = useStyles();

    const loading = (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box component={Container} className={classes.box}>
                <CircularProgress/>
            </Box>
        </ThemeProvider>
    )

    if (state !== undefined) {
        switch (state.scenario) {
            case sdk.Scenario.AuthSucceeded:
            case sdk.Scenario.Continuation:
                return (
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <PhotoUpload addPhotos={addPhotos} noPhotos={photos.length === 0}/>
                        <LinearProgress className={classes.progress}/>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={publishing.valueOf() === PublishingState.finished.valueOf()}
                        >
                            <Box className={classes.successAlert}>
                                Published!
                            </Box>
                        </Snackbar>
                        {photos.length > 0 ? (<PhotoGalleryGrid photos={photos}/>) : loading}
                    </ThemeProvider>
                );
            case sdk.Scenario.NotAuthorised:
                return (
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <LoginForm/>
                    </ThemeProvider>
                );
            default:
                return loading;
        }
    }
    return loading
};

export default AuthLayout;
