import React, { useEffect } from 'react';
import { GifState } from '../Context/Context';
import Gifs from '../Components/Gifs';
import FilterGif from '../Components/FilterGif';

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();
  
  const fetchTrendingGIFs = async () => {
    try {
      const { data } = await gf.trending({
        limit: 20,
        type: filter,
        rating: "g"
      });

      setGifs(data);
    } catch (error) {
      console.error("Error fetching trending GIFs:", error);
    }
  };

  useEffect(() => {
    fetchTrendingGIFs();
  }, [filter, gf, setGifs]);

  return (
    <div>
      <img 
        src='/banner.gif'
        alt='earth banner'
        className='rounded w-full mt-2'
      />
      {/* <FilterGif /> */}
      <FilterGif showTrending></FilterGif>

      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
        {gifs.map((gif) => (
          <Gifs gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
