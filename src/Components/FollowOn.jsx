import React from 'react'
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const FollowOn = () => {
  return (
    <div
    className="faded-text pt-2" //custom - faded-text
  >
    <span>Follow on:</span>
    <div className="flex gap-4 pt-3">
      <a href="https://www.youtube.com/@ammar7109">
        <FaYoutube size={20} />
      </a>
      <a href="https://www.instagram.com/ammy.pvt_04">
        <FaInstagram  size={20} />
      </a>
      <a href="https://x.com/ammy_0069">
        <FaXTwitter  size={20} />
      </a>
    </div>
  </div>
  )
}

export default FollowOn
