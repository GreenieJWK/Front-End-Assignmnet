import { useState, useEffect } from "react";
import "./App.css";

const APILink = "https://awf-api.lvl99.dev";
var Token = null;
function App() {
  const [token, setToken] = useState(null);
  const [forums, setForums] = useState([]);

  // Login on mount
  useEffect(() => {
    loginToAPI();
  }, []);

  async function getForums() {
    const response = await fetch(APILink + '/forums', {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    const forums = await response.json();
    setForums(forums)
    console.log(forums.length);
  }

  // function defenitions
  async function loginToAPI() {
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
    Token = data.access_token;
    console.log("Login Successful");
    getForums();
  }

  return (
    <>
      <div id="Banner" className="Banner">
        <button onClick={getForums}>Get Forums</button>
        <h2>Jack Kaufman</h2>
      </div>

      <div id="credditPosts" className="credditPosts">
        {forums.map(forum => (
          <div key={forum.slug}>
            <h3>{forum.slug}</h3>
            <p>{forum.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
