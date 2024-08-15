import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GifState } from '../Context/Context';
import Gifs from '../Components/Gifs';
import { HiMiniChevronUp, HiMiniChevronDown, HiMiniHeart } from "react-icons/hi2";
import FollowOn from '../Components/FollowOn';
import { FaPaperPlane } from 'react-icons/fa';
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const Gif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gf, addToFavorites, favourites } = GifState();

  const shareGif = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: gif.title,
          text: 'Check out this GIF!',
          url: gif.url, // Replace with the URL to the GIF if it's available
        });
        console.log('Gif shared successfully');
      } catch (error) {
        console.error('Error sharing GIF:', error);
      }
    } else {
      alert('Sharing not supported on this browser. Please copy the link manually.');
    }
  };

  const EmbedGif = () => {
    const embedCode = `<iframe src="${gif.embed_url}" width="${gif.width}" height="${gif.height}" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
    
    const textarea = document.createElement('textarea');
    textarea.value = embedCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    alert('Embed code copied to clipboard!');
  };

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, [type, slug]);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider" />
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gifs gif={gif} hover={false} />

            {/*Mobile UI*/}
            <div className="flex sm:hidden gap-1 mt-4">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            <button
              onClick={shareGif}
              className="flex gap-6 items-center font-bold text-lg mt-4"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
          </div>
          {/* Add your favourite/share/embed section here */}
          <div className='hidden sm:flex flex-col gap-5 mt-6'>
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favourites.includes(gif.id) ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif}
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={EmbedGif}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>
        <div className="mt-8">
          <span className="font-extrabold">Related Gifs</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {relatedGifs.map((relatedGif) => (
              <Gifs gif={relatedGif} key={relatedGif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gif;
