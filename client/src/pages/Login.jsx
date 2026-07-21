import { useState } from "react";
import { userLogin } from "../services/UserService"

function Login({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    const userData = {
      email: email,
      password: password
    }
    userLogin(userData)
      .then( (data) => onLogin(token, user))
      .catch( (error) => setErrors(error))
    setIsLoading(false)
  }

  return (
    <div className="login-page">
      <h3>Job Bait:</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Username</label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Email</label>
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