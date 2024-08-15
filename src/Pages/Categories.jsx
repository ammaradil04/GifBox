import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GifState } from '../Context/Context';
import Gifs from '../Components/Gifs';
import FollowOn from '../Components/FollowOn';

const Categories = () => {
  const [searchResults, setSearchResults] = useState([]);

  const {gf} = GifState();

  const {category} = useParams();

  const fetchSearchResults = async () => {
    const {data} = await gf.gifs(category, category);

    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [category])

  return (
     <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {searchResults.length > 0 && <Gifs gif={searchResults[0]} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <FollowOn />
        <div className="divider" />
        </div>
        <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join(" & ")} GIFs
        </h2>
        
        {searchResults.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
            {searchResults.slice(1).map((gif) => (
              <Gifs gif={gif} key={gif.id} />
            ))}
          </div>
        )}
        </div>
    </div>
  )
}

export default Categories
