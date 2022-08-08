import "./App.css";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import Header from "./components/Header";
import Search from "./components/Search";
import { Grid } from "@material-ui/core";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
    
      <Grid container xs={12} lg={12} sm={12}>
      <Grid item xs={12} lg={12} sm={12}>
        <div >
          <div className="head">
            <Header />
          </div>
          <Search />

          {/* <div>
          <footer style={{marginTop:''}}>©notJAYanand 2022</footer>
          </div> */}
          <Footer/>
        </div>
      </Grid>
    </Grid>
    </div>

  );
}

export default App;
