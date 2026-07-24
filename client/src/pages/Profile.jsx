import { useOutletContext } from "react-router-dom"

function Profile() {
  const { user, logout } = useOutletContext();

  return (
    <div>
      <img 
        className="profile-img"
        src={user.image_url}
        title={user.name}
        alt={user.name}>      
      </img>
      <h4> Name: {user.name} </h4>
      <h3> Email: {user.email}</h3>
      {user.image_url !== null && (
        <h3> Image URL: {user.image_url}</h3>
      )}
      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Profile;