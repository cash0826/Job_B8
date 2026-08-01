import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">

        {/* Emoji / Icon */}
        <div className="p-3"><p className="text-6xl">🪱</p></div>

        {/* Title */}
        <div className="p-3"> <h1 className="text-3xl font-bold text-gray-800"> Page Not Found </h1> </div>

        {/* Description */}
        <div className="p-3"> <p className="text-gray-600 ">The page you're looking for doesn't exist or may have been moved. </p> </div>

        {/* Return Home Button */}
        <div className="p-3">
          <Link
            to="/"
            className="inline-block bg-sky-600 text-white font-semibold px-6 py-2 
              rounded-md hover:bg-sky-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
