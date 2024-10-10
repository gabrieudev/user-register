import "./style.css";
import Trash from "../../assets/trash.png";
import Error from "../../assets/error.png";
import Close from "../../assets/close.png";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const inputUsername = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function getUsers() {
    let usersFromApi = await api.get("/users");

    setUsers(usersFromApi.data);
  }

  async function createUser() {
    try {
      await api.post("/users", {
        username: inputUsername.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      });

      getUsers();
    } catch (error) {
      setError(error.response?.data?.detail || "Unknown error");
      setShowSidebar(true);
    }
  }

  async function deleteUser(userId) {
    await api.delete(`/users/${userId}`);

    getUsers();
  }

  const closeSidebar = () => {
    setShowSidebar(false);
    setError(null);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>User register</h1>
        <input
          required
          placeholder="Username"
          name="username"
          type="text"
          ref={inputUsername}
        />
        <input
          required
          placeholder="Email"
          name="email"
          type="email"
          ref={inputEmail}
        />
        <input
          required
          placeholder="Password"
          name="password"
          type="password"
          ref={inputPassword}
        />
        <input onClick={createUser} type="submit" value="Register" />
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              ID: <span>{user.id}</span>
            </p>
            <p>
              Username: <span>{user.username}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button type="button" onClick={() => deleteUser(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
      {showSidebar && (
        <div className="error__sidebar">
          <div className="error__content">
            <img src={Error} />
            <p>{error}</p>
            <button type="button" onClick={closeSidebar}>
              <img src={Close} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
