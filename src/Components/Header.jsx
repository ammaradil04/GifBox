import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from '../Context/Context';
import GifSearch from './GifSearch';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { gf, favourites } = GifState();

  // Function to fetch GIF categories from the API
  const fetchGifCategories = async () => {
    try {
      const { data } = await gf.categories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 relative">

      {/* Logo and Title */}
      <div className="flex items-center">
        <Link to="/" className="flex gap-4 items-center mb-2">
          <img src="/giphy.webp" className="w-12" alt="Giphy Logo" />
          <h1 className="text-4xl font-bold tracking-tight cursor-pointer">GifBox</h1>
        </Link>
      </div>

      {/* Categories and Other Navigation Links */}
      <div className="flex items-center gap-4">
        <div className="font-bold text-md flex gap-2 items-center">

          {/* Render top 5 categories as links */}
          {categories?.slice(0, 5)?.map((category) => (
            <Link
              key={category.name_encoded} 
              to={`/${category.name_encoded}`} 
              className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
            >
              {category.name}
            </Link>
          ))}

          {/* Categories Dropdown Icon */}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${showCategories ? "gradient" : ""} border-b-4 hidden lg:block`}
            />
          </button>

          {/* Favourite Gifs Link */}
          {favourites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favourites" className="text-white">Favourite Gif</Link>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <button>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={30}
            />
          </button>
        </div>

        {/* Full-width dropdown for categories when showCategories is true */}
        {showCategories && (
          <div className="absolute inset-x-0 top-20 px-10 pt-6 pb-9 w-screen gradient z-20">
            <span className="font-bold text-lg">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />

            {/* Grid layout for all categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => (
                <Link to={`/${category.name_encoded}`} className="font-bold" key={category.name_encoded}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search bar */}
      <GifSearch />
    </nav>
  );
};

export default Header;
