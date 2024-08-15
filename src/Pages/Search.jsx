import React, { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import Gifs from '../Components/Gifs'; // Import the Gifs component
import FilterGif from '../Components/FilterGif'; // Import the FilterGif component
import { GifState } from '../Context/Context'; // Import GifState from the context

const Search = () => {
  const [searchResults, setSearchResults] = useState([]); // Initialize state for search results
  const { gf, filter } = GifState(); // Access global state using GifState
  const { query } = useParams(); // Get the search query from the URL parameters

  // Function to fetch search results based on the query and filter
  const fetchSearchResults = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });

    setSearchResults(data); // Update search results state with the fetched data
  };

  // useEffect to fetch search results whenever the filter or query changes
  useEffect(() => {
    fetchSearchResults();
  }, [filter, query]); // Dependency array includes both filter and query

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2> {/* Display the search query */}
      <FilterGif alignLeft={true} /> {/* Render the FilterGif component */}
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            // Render Gifs component for each search result
            <Gifs gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>No GIFs found for {query}. Try searching for Stickers instead?</span>
      )}
    </div>
  );
}

export default Search; // Export the Search component as the default export
