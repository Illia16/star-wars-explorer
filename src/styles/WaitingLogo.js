import React from 'react';
import { CircularProgress } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        color: '#FFE81F',
        position: "absolute",
        left: '45vw',
        top: '45vh',
    }
}

const useStyles = makeStyles(styles);

const Waiting = () => {
    const classes = useStyles();
    return (
        <CircularProgress aria-label="loading data" className={classes.root}></CircularProgress>
    )
}

export default Waiting;