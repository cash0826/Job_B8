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
      .then((data) => {
        if (!data) {
          setErrors(["Login Failed. Invalid Credentials"])
          return
        }
        const {token, userID } = data
        onLogin({ token, userID})
      })
      .catch((error) => setErrors(error))
      .finally(() => setIsLoading(false))
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