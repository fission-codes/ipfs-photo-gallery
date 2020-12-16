import * as React from 'react';
import * as sdk from 'webnative';
import { Box, Button, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Icon from './undraw_image_upload_wqh3.svg'
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
            margin: theme.spacing(1)
        },
        media: {
            paddingTop: '64%',
            backgroundSize: '96%',
            marginTop: theme.spacing(4)
        },
        subtitle: {
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(3)
        },
        card: {
            marginTop: theme.spacing(-4)
        }
    }));
    const classes = useStyles();

    return (
        <>
            <CssBaseline/>
            <Box className={classes.box}>
                <Grid container={true} justify={'center'} alignItems={'center'}>
                    <Grid item={true} xs={12} sm={9} lg={8}>
                        <CardMedia
                            className={classes.media}
                            image={Icon}
                            title="IPFS Photo Gallery"
                        />
                    </Grid>
                    <Grid item={true} sm={9} md={7}>
                        <Box px={2} pb={2} className={classes.card}>
                            <CardContent>
                                <Typography variant={'h3'} component={'h1'} >Fission Photos</Typography>
                                <Typography variant={'h5'} component={'h2'} gutterBottom={true} className={classes.subtitle}>Your photos on the distributed web</Typography>
                                <Button variant={'contained'} color={'primary'} onClick={() => state !== undefined ? sdk.redirectToLobby(state.permissions) : undefined}>Log In to Fission</Button>
                            </CardContent>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

export default LoginForm;
