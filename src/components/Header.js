import React from 'react'
import './css/Header.css';
import { Grid } from '@material-ui/core';






export default function Header() {
    // const classes = useStyles();
    // Drawer opening logic
    // const [state, setState] = React.useState(false);
    // const toggleDrawer = (open) => (event) => {
    //   setState(open);
    // };
return(
        <Grid container>
            {/* <Grid item lg={0.5} sm={0.5} xs={0.5} spacing={0}>
            <div className="menuIcon" >
            {/* <IconButton color='inherit'><MenuIcon /></IconButton></div> */}
            {/* </Grid> */} 
            <Grid item lg={1} sm={1} xs={1}>
                <div className="headText">
                    searchspot
                </div>
                </Grid>
        </Grid>

);    
}
