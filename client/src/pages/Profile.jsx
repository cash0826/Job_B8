import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
  const navigate = useNavigate();

  // AuthContext
  const {authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth();

  function logout() {
    localStorage.removeItem("token")
    setAuthUser(null)
    setIsLoggedIn(false)
  }

  return (
    <div>
      <img 
        className="profile-img"
        src={authUser.image_url}
        title={authUser.name}
        alt={authUser.name}>      
      </img>
      <h4> Name: {authUser.name} </h4>
      <h3> Email: {authUser.email}</h3>
      {authUser.image_url !== null && (
        <h3> Image URL: {authUser.image_url}</h3>
      )}
      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Profile;