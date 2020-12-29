import * as React from 'react';
import LoginForm from './LoginForm';
import { Box, Button, CircularProgress, createMuiTheme, LinearProgress, makeStyles, Snackbar, ThemeProvider } from '@material-ui/core';
import * as sdk from 'webnative';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PhotoUpload } from '../Photos/PhotoUpload';
import PhotoGalleryGrid from '../Photos/PhotoGalleryGrid';
import usePhotos, { PublishingState } from '../Photos/usePhotos';
import { ReactComponent as FissionIcon } from './FissionIcon.svg';
import useAuth from './useAuth';

const AuthLayout: React.FC = () => {
    const {state} = useAuth();
    const {addPhotos, photos, publishing, fetching} = usePhotos(state);

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
        layout: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        loading: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: 50,
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

    const loading = <Box className={classes.loading}>
        <CircularProgress />
    </Box>

    switch (state?.scenario) {
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
                    {fetching && loading}
                    {photos.length > 0 && (
                        <Box className={classes.layout}>
                            <PhotoGalleryGrid photos={photos}/>
                            <Box paddingX={3} paddingY={1} display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} minHeight={'min-content'}>
                                <Button
                                    variant={'text'}
                                    size={'small'}
                                    startIcon={<FissionIcon/>}
                                    focusRipple={true}
                                    href={`https://drive.fission.codes/`}
                                >
                                    View on Fission Drive
                                </Button>
                            </Box>
                        </Box>
                    )}
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
            return (
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {loading}
                </ThemeProvider>
            )
    }

};

export default AuthLayout;
