import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
  const {user, logout} = useAuth();

  return (
    <div>
      <img src={user.image_url} alt={user.name}/>
      <h4> Name: {user.name} </h4>
      <h3> Email: {user.email}</h3>
      {user.image_url !== null && (
        <h3> Image URL: {user.image_url}</h3>
      )}
      
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile;