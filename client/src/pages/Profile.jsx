import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Profile
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center">
          {user.image_url ? (
            <img
              src={user.image_url}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover shadow"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>

          {user.image_url && (
            <p>
              <span className="font-semibold">Image URL:</span> {user.image_url}
            </p>
          )}
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <button
            onClick={logout}
            className="
              w-full  bg-rose-300 
              text-black font-semibold 
              py-2 
              rounded-md hover:bg-rose-500 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
