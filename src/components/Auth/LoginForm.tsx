import * as React from 'react';
import {Box, Button, Card, CardContent, CardMedia, createMuiTheme, Grid, TextField, Typography} from "@material-ui/core";
import useAuth from "./useAuth";
import CssBaseline from "@material-ui/core/CssBaseline";
import Icon from './undraw_image_upload_wqh3.svg'
import {makeStyles} from "@material-ui/core/styles";


const LoginForm: React.FC = () => {
    const useStyles = makeStyles(theme => ({
        media: {
            paddingTop: '64%',
            backgroundSize: '96%',
            marginTop: theme.spacing(4)
        },
    }));
    const classes = useStyles();
    
    const onClick = sdk.redirectToLobby();

    return (
        <>
            <CssBaseline/>
            <Box my={createMuiTheme().spacing(1)}>
                <Grid container={true} justify={'center'}>
                    <Grid item={true} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                className={classes.media}
                                image={Icon}
                                title="IPFS Photo Gallery"
                            />
                            <Box px={2} pb={2}>
                                <CardContent>
                                    <Typography variant={'h5'} component={'h1'}>IPFS Photo Gallery</Typography>
                                    <Typography variant={'subtitle1'} component={'h2'}>Pin your photos to the distributed web!</Typography>
                                    <Button variant={'contained'} color={'primary'} onClick={onClick}>Log In to Fission</Button>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

export default LoginForm;
