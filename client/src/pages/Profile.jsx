import { useOutletContext } from "react-router-dom"

function Profile() {
  const { user, logout } = useOutletContext();

  return (
    <div>
      <p> {user.name} </p>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Profile;