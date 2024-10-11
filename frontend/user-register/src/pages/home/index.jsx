import "./style.css";
import Trash from "../../assets/trash.png";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import ErrorSidebar from "../../components/errorSidebar/ErrorSidebar";

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

  async function createUser(event) {
    event.preventDefault();
    try {
      await api.post("/users", {
        username: inputUsername.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      });
      inputUsername.current.value = "";
      inputEmail.current.value = "";
      inputPassword.current.value = "";
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

  const clearError = () => {
    setError(null);
    setShowSidebar(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <ErrorSidebar
        errorMessage={error}
        showSidebar={showSidebar}
        onClearError={clearError}
      />
      <form onSubmit={createUser}>
        <h1>User register</h1>
        <input
          placeholder="Username"
          name="username"
          type="text"
          ref={inputUsername}
        />
        <input placeholder="Email" name="email" type="email" ref={inputEmail} />
        <input
          placeholder="Password"
          name="password"
          type="password"
          ref={inputPassword}
        />
        <button type="submit">Register</button>
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
    </div>
  );
}

export default Home;
