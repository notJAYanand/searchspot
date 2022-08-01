import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


const CLIENT_ID = '3ca92eeaf0664164b665eefbb92882a8';
//test
//they were treating warning as error, as it is not used im commenting it, uncomment when needed.
// const CLIENT_SECRET = '';

// const REDIRECT_URI = 'http://localhost:3000/';
const REDIRECT_URI = 'https://searchspot.netlify.app/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(s => s.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, [])





  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setArtistsData([]);
  }

  //Search
  const [searchKey, setSearchKey] = useState("");
  // console.log(searchKey);

  const [artists, setArtistsData] = useState([]);
  const searchArtist =
    async (e) => {
      e.preventDefault();
      const { data } = await axios.get("https://api.spotify.com/v1/search",
        {
          headers: {
            Authorization: `Bearer ${token}`

          },
          params: {
            q: searchKey,
            type: 'artist'
          }
        })
      // console.log({data});
      setArtistsData(data.artists.items);
    }



  console.log(artists);

  const renderArtists = () => {
    return (artists.map(artist => {
      return (
        <div key={artist.id}>
          {artist.images.length ?
            <div className="artistImage" style={{}}><img src={artist.images[0].url} style={{ width: '40vh', borderRadius: '2000px' }} alt={"artist-art"}></img></div>
            :
            <div className="artistImage" style={{ alignItems: 'center', backgroundColor: '#ffffff', width: '40vh', borderRadius: '2000px' }}>null</div>}
          <a href={artist.external_urls.spotify}>{artist.name}</a>
        </div>);
    }))
  }

  return (
    <div className="App">

      <header>
        <div className="head">
          <div className="headText">Spotify Artist
          </div>
        </div>
      </header>

      {!token ?
        (<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
          Login to Spotify</a>)
        : (<button onClick={logout}>Logout</button>)
      }

      {
        token ?
          (<form>
            {/* <SearchField/> */}
            <input type={"text"} onChange={(e) => { setSearchKey(e.target.value) }}></input>
            <button type={"submit"} onClick={searchArtist}>Search</button>
          </form>) : (<h2>Please Login</h2>)
      }
      {renderArtists()}
      <footer>©notJAYanand 2022</footer>
    </div>
  );
}

export default App;
