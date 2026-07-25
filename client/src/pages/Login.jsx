import { useState } from "react";
import { userLogin } from "../services/UserService"
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // AuthContext
  const {authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password
    }
    userLogin(userData)
      .then((data) => setAuthUser(prev => data))
      .catch((e) => console.log("Login handleSubmit error: " , e))

    setIsLoggedIn(true)
    navigate("/")
  }

  return (
    <div className="login-page">
      <h3>Job B8🪱:</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Login"
          className="form-submit"
        />
      </form>
    </div>
  )
}

export default Login;