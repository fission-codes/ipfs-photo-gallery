import * as React from 'react';
import * as sdk from 'webnative';
import { Box, Button, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Icon from './undraw_image_upload_wqh3.png'
import {ReactComponent as FissionIcon} from './FissionIcon.svg';
import { makeStyles } from '@material-ui/core/styles';
import useAuth from './useAuth';


const LoginForm: React.FC = () => {
    const {state} = useAuth()
    const useStyles = makeStyles(theme => ({
        box: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(2),
            [theme.breakpoints.up(theme.breakpoints.values.md)]: {
                padding: theme.spacing(4)
            },
        },
        media: {
            paddingTop: '72.916875%',
            backgroundSize: '100%',
        },
        heading: {
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: theme.spacing(),
        },
        subtitle: {
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(3),
        },
        card: {
            // marginTop: '-10%',
        },
        buttonIcon: {
            opacity: 0.6,
            fill: theme.palette.primary.contrastText,
        }
    }));
    const classes = useStyles();

    return (
        <>
            <CssBaseline/>
            <Box className={classes.box}>
                <Grid container={true} justify={'center'} alignItems={'center'}>
                    <Grid item={true} xs={12} sm={10} md={7}>
                        <CardMedia
                            className={classes.media}
                            image={Icon}
                            title="Milione — Web-Native Photo Explorer"
                        />
                    </Grid>
                    <Grid item={true} sm={8} md={6} lg={3}>
                        <Box px={2} pb={2} className={classes.card}>
                            <CardContent>
                                <Typography variant={'h2'} component={'h1'} className={classes.heading} >Milione</Typography>
                                <Typography
                                    variant={'h5'}
                                    component={'h2'}
                                    gutterBottom={true}
                                    className={classes.subtitle}
                                >
                                    A web-native photo explorer available wherever you may&nbsp;roam
                                </Typography>
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={() => state !== undefined ? sdk.redirectToLobby(state.permissions) : undefined}
                                    startIcon={<FissionIcon />}
                                >
                                    Sign In With Fission
                                </Button>
                            </CardContent>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default LoginForm;
