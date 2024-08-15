import React, { useEffect, useState } from 'react'
import { GifState } from '../Context/Context';
import Gifs from '../Components/Gifs';

const Favourite = () => {
  const {gf, favourites} = GifState();
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);
  
  const fetchFavoriteGIFs = async () => {
    const {data: gifs} = await gf.gifs(favourites);
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text ">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs.map((gif) => (
          <Gifs gif={gif} key={gif.id} />
        ))}
        </div>
    </div>
  )
}

export default Favourite
