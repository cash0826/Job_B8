import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login({ email, password })
      navigate("/");
    } catch (error) {
      console.log("Login error: ", error)
    }
  }

  return (
    <div className="login-page">
      <h3>Job B8🪱:</h3>
      <form className="login-form" onSubmit={handleSubmit}>

        <label>Email</label>
        <input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>

        <input type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default Login;