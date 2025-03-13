import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full flex items-center justify-between py-5 px-10 border-t-2 border-gray-200">
      <p>
        Driven by <span className="font-bold">AI</span> intelligence and{" "}
        <span className="font-bold">Vercel's cutting edge functions.</span>
      </p>
      <div className="flex gap-2 items-center">
        <a href="https://github.com/Shobhit070304">
          <img
            className="w-8 h-8 rounded-full"
            src="https://w7.pngwing.com/pngs/646/324/png-transparent-github-computer-icons-github-logo-monochrome-head-thumbnail.png"
            alt=""
          />
        </a>
        <a href="https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a/">
          <img
            className="w-8 h-8 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3UHgNa9VXUDTrVTsfjkiWrMovEWvXnJ_eg&s"
            alt=""
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
