import React from 'react'; // Importing React to create and use components
import { GifState } from '../Context/Context'; // Importing GifState to access global state related to GIFs
import { HiMiniArrowTrendingUp } from "react-icons/hi2"; // Importing an icon for the trending arrow

// Define an array of filter options with their respective titles, values, and background styles
const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background: "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

// Define the FilterGif component with optional props: alignLeft and showTrending
const FilterGif = ({ alignLeft = false, showTrending = false }) => {
  
  // Access filter state and its setter function from the GifState context
  const { filter, setFilter } = GifState();

  return (
    // Define the main container div with dynamic classes based on alignLeft and showTrending props
    <div className={`flex my-3 gap-3 ${alignLeft ? " " : "justify-end"} ${showTrending ? "justify-between flex-col sm:flex-row sm:items-center" : ""}` }>
      
      {/* Conditionally render the Trending section if showTrending is true */}
      {showTrending && (
        <span className='flex gap-2'>
          {/* Display trending icon */}
          {showTrending && (<HiMiniArrowTrendingUp size={25} className='text-teal-400' /> )}
          {/* Display trending label */}
          <span className='font-semibold text-gray-400'>Trending</span>
        </span>
      )}

      {/* Filter options container with a background and rounded edges */}
      <div className='flex min-w-80 rounded-full bg-gray-800'>
        {filters.map((f) => {
          return (
            // Render each filter option as a clickable span
            <span
              onClick={() => setFilter(f.value)} // Set the selected filter value on click
              className={`${filter === f.value ? f.background : ""} font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer`}
              key={f.title} // Unique key for each filter option
            >
              {f.title} {/* Display the title of the filter */}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default FilterGif; // Export the FilterGif component as the default export
