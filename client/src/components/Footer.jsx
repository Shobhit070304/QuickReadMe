import React from "react";
import { Github, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="card w-full flex items-center justify-between py-2 px-3 mt-4 text-muted text-sm">
      <span>
        Driven by <span className="text-accent font-semibold">AI</span> & <span className="text-accent font-semibold">Vercel</span>
      </span>
      <div className="flex gap-2 items-center">
        <a href="https://github.com/Shobhit070304" target="_blank" rel="noopener noreferrer">
          <Github size={18} />
        </a>
        <a href="https://www.linkedin.com/in/shobhit-kumar-sharma-17bb4223a/" target="_blank" rel="noopener noreferrer">
          <Linkedin size={18} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
