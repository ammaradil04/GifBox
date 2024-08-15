import React, { useState } from 'react'; // Import React and useState for state management
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FaMagnifyingGlass } from "react-icons/fa6"; // Import the magnifying glass icon
import { HiMiniXMark } from "react-icons/hi2";

const GifSearch = () => {
  const [query, setQuery] = useState(""); // useState hook to manage the search query
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate between routes

  // Function to handle GIF search
  const searchGifs = async () => {
    if (query.trim() === "") {
      return; // Do nothing if the search query is empty or contains only spaces
    }
    navigate(`/search/${query}`); // Navigate to the search results page with the query
  }

  return (
    <div className="flex relative">
      {/* Input field for entering the search query */}
      <input
        type="text"
        value={query} // Bind the input value to the query state
        onChange={(e) => setQuery(e.target.value)} // Update the query state on input change
        placeholder="Search all the GIFs " // Placeholder text for the input field
        className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />
      
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6"
        >
          <HiMiniXMark size={22} />
        </button>
      )}


      {/* Button to trigger the searchGifs function */}
      <button
        onClick={searchGifs} // Call searchGifs when the button is clicked
        className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br"
      >
        {/* Magnifying glass icon inside the button */}
        <FaMagnifyingGlass size={35} className="-scale-x-100" />
      </button>

    </div>
  );
}

export default GifSearch; // Export the GifSearch component as the default export
