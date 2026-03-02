import { useState, useEffect } from "react";
import "./App.css";

const APILink = "https://awf-api.lvl99.dev";

function App() {
  const [token, setToken] = useState(null);
  const [forums, setForums] = useState([]);

  // on page open do:
  useEffect(() => {
    loginToAPI();
  }, []);

  async function getForums(currentToken) 
  {
    const response = await fetch(APILink + '/forums', {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    const forums = await response.json();
    setForums(forums)
    
    console.log(forums.length);
  }

 
  async function loginToAPI() 
  {
   
    const response = await fetch(APILink + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "jkaufman2743",
        password: "8932743",
      }),
    });

    const data = await response.json();
    setToken(data.access_token);
     
    getForums(data.access_token);
  }

  function favorite()
  {
    console.log("favorite");
  }

  function unfavorite()
  {
   console.log("unfavorite");
  }

  return (
    <>
      <div id="Banner" className="Banner">
        <h2>Jack Kaufman</h2>
        <button className="FavoritePageButton" onClick={getForums}>Favorites Page</button>
      </div>

      <div id="credditPosts" className="credditPosts">
        {forums.map(forum => (
          <div className="Posts" key={forum.slug}>
            <h3>{forum.slug}</h3>
            <p>{forum.description}</p>
            <button className="FavoritesButtons" onClick={favorite}>Favorite</button>
            <button className="FavoritesButtons" onClick={unfavorite}>Unfavorite</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
