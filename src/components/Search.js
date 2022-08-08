import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./css/Search.css";
import { Avatar, Button, InputBase, Typography } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";

//FIX SEARCH TODO

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const CLIENT_ID = "3ca92eeaf0664164b665eefbb92882a8";
//test
//they were treating warning as error, as it is not used im commenting it, uncomment when needed.
// const CLIENT_SECRET = '';

const REDIRECT_URI = "http://localhost:3000/";
// const REDIRECT_URI = 'https://searchspot.netlify.app/';
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

export default function Search() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((s) => s.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setArtistsData([]);
  };

  //Search
  const [searchKey, setSearchKey] = useState("");
  // console.log(searchKey);

  const [artists, setArtistsData] = useState([]);
  const searchArtist = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    // console.log({data});
    setArtistsData(data.artists.items);
  };

  console.log(artists);

  const renderArtists = () => {
    return artists.map((artist) => {
      return (
        <div key={artist.id}>
          {artist.images.length ? (
            <div className="artistImage" style={{}}>
              <img
                src={artist.images[0].url}
                style={{ width: "40vh", borderRadius: "2000px" }}
                alt={"artist-art"}
              ></img>
            </div>
          ) : (
            <div className="artistImage" style={{width: "40vh", borderRadius: "2000px"}}>
              <Avatar style={{width: "40vh",height:'40vh'}}>No Image</Avatar>
            </div>
          )}
          <Typography>
            <a href={artist.external_urls.spotify}>{artist.name}</a>
          </Typography>
          
          <Typography>
            {artist.followers.total} Followers
          </Typography>
            
            
        </div>
      );
    });
  };
  const classes = useStyles();
  return (
    // <div>Search</div>

    <div>
    {token ? (
        <form>
          {/* <SearchField/> */}
          {/* <input
            type={"text"}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          ></input> */}
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            style={{
              marginTop:'5vh',
              color:'#ffffff',
              backgroundColor: "#000000",
              borderRadius: "20px",
              opacity: "0.4",
            }}
          />
          <button type={"submit"} onClick={searchArtist} style={{marginLeft:'0.905vw'}}>
            Search
          </button>
        </form>
      ) : (
        <h2> New here? Please Login.</h2>
      )}
      {!token ? (
        <Button variant="contained" elevation={0}
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </Button>
      ) : (
        <Button onClick={logout} style={{marginLeft:'80vw', marginTop:'-5vw',backgroundColor:''}}>Logout</Button>
      )}

      
      {renderArtists()}
    </div>
  );
}
