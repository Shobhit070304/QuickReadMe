import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Loading from "./Loading";
import generateContent from "../config/aiService";
import { Github } from "lucide-react";

const SOCIAL_TEMPLATES = {
  github: "https://github.com/USERNAME",
  linkedin: "https://linkedin.com/in/USERNAME",
  leetcode: "https://leetcode.com/USERNAME",
  codeforces: "https://codeforces.com/profile/USERNAME",
  twitter: "https://twitter.com/USERNAME",
  hackerrank: "https://www.hackerrank.com/USERNAME",
  codechef: "https://www.codechef.com/users/USERNAME",
  gfg: "https://auth.geeksforgeeks.org/user/USERNAME",
  stackoverflow: "https://stackoverflow.com/users/USERNAME",
  // Add more as needed
};

function Hero() {
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [socials, setSocials] = useState("");
  const [socialUsernames, setSocialUsernames] = useState({});
  const [gif, setGif] = useState("");
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Parse socials and show username fields
  const socialList = socials
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s && SOCIAL_TEMPLATES[s]);

  const handleSocialUsernameChange = (platform, value) => {
    setSocialUsernames((prev) => ({ ...prev, [platform]: value }));
  };

  // Build full social links
  const socialLinks = socialList
    .map((platform) => {
      const uname = socialUsernames[platform] || "USERNAME";
      return `${platform}: ${SOCIAL_TEMPLATES[platform].replace("USERNAME", uname)}`;
    })
    .join("; ");

  async function AnalyzeDescription() {
    try {
      setLoading(true);
      setError("");
      await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: { Authorization: import.meta.env.VITE_GITHUB_API },
        }
      );
      const prompt = `Generate a GitHub profile README in markdown with ONLY these sections:\n1. Big emoji heading and intro (1-2 lines, concise, no extra text)\n2. Centered GIF (use the provided GIF URL or a random fun developer GIF)\n3. 'Connect with me' section with only the provided socials, using icons/badges and the provided links\n4. 'Skills' section with only the provided skills, using icons/badges\nDo NOT include any other sections, explanations, instructions, stats, graphs, quotes, or placeholders. Output ONLY the markdown for the README.\nBio: ${description}\nSkills: ${skills}\nSocials: ${socialLinks}\nGIF: ${gif || 'random fun developer gif'}`;
      const readmeContent = await generateContent(prompt);
      setReadme(readmeContent);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "AI service failed. Please try again.");
    }
  }

  async function AnalyzeProfile() {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: { Authorization: import.meta.env.VITE_GITHUB_API },
        }
      );
      const prompt = `Generate a GitHub profile README in markdown with ONLY these sections:\n1. Big emoji heading and intro (1-2 lines, concise, no extra text)\n2. Centered GIF (use the provided GIF URL or a random fun developer GIF)\n3. 'Connect with me' section with only the provided socials, using icons/badges and the provided links\n4. 'Skills' section with only the provided skills, using icons/badges\nDo NOT include any other sections, explanations, instructions, stats, graphs, quotes, or placeholders. Output ONLY the markdown for the README.\nBio: ${response.data.bio}\nSkills: ${skills}\nSocials: ${socialLinks}\nGIF: ${gif || 'random fun developer gif'}`;
      const readmeContent = await generateContent(prompt);
      setReadme(readmeContent);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "AI service failed. Please try again.");
    }
  }

  const handleCopy = () => {
    if (readme) {
      navigator.clipboard.writeText(readme);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <section className="card flex flex-col items-center w-full mb-4">
      <div className="flex items-center gap-2 mb-3">
        <a href="https://github.com/Shobhit070304" target="_blank" rel="noopener noreferrer">
          <Github size={20} className="text-accent" />
        </a>
        <a href="https://github.com/Shobhit070304/QuickReadMe" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium text-sm">
          Star on Github
        </a>
      </div>
      <div className="text-lg font-bold flex flex-col items-center mt-1 text-accent text-center">
        <span>Generate GitHub Profile README</span>
      </div>
      <p className="mt-1 text-muted text-xs">200+ Profiles generated so far</p>
      <div className="my-4 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <span className="w-6 h-6 bg-accent/20 p-1 rounded-full text-accent flex justify-center items-center text-xs font-bold">1</span>
            <span className="text-muted text-xs">Let AI summarize your Github Activity and repo</span>
          </div>
          <Input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-zinc-800 text-white border-none focus:ring-2 focus:ring-accent placeholder-gray-400 text-xs py-1 px-2"
            placeholder="Enter your github username"
          />
          <Input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full bg-zinc-800 text-white border-none focus:ring-2 focus:ring-accent placeholder-gray-400 text-xs py-1 px-2"
            placeholder="Skills (comma separated, e.g. React, Node.js, Python)"
          />
          <Input
            value={socials}
            onChange={(e) => setSocials(e.target.value)}
            className="w-full bg-zinc-800 text-white border-none focus:ring-2 focus:ring-accent placeholder-gray-400 text-xs py-1 px-2"
            placeholder="Socials (comma separated, e.g. github, linkedin, leetcode, codeforces, twitter)"
          />
          {socialList.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              {socialList.map((platform) => (
                <div key={platform} className="flex items-center gap-2 text-xs">
                  <span className="text-accent font-medium capitalize w-20">{platform}</span>
                  <span className="text-muted">{SOCIAL_TEMPLATES[platform].replace("USERNAME", "")}</span>
                  <Input
                    value={socialUsernames[platform] || ""}
                    onChange={(e) => handleSocialUsernameChange(platform, e.target.value)}
                    className="w-32 bg-zinc-800 text-white border-none focus:ring-2 focus:ring-accent placeholder-gray-400 text-xs py-1 px-2"
                    placeholder="username"
                  />
                </div>
              ))}
            </div>
          )}
          <Input
            value={gif}
            onChange={(e) => setGif(e.target.value)}
            className="w-full bg-zinc-800 text-white border-none focus:ring-2 focus:ring-accent placeholder-gray-400 text-xs py-1 px-2"
            placeholder="GIF URL (optional, leave blank for random)"
          />
          <Button onClick={AnalyzeProfile} className="w-full cursor-pointer bg-black text-white font-medium py-1 rounded-md text-xs shadow-sm hover:bg-black hover:text-white active:bg-black active:text-white transition">
            Analyze Github Profile
          </Button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-2 items-center">
            <span className="w-6 h-6 bg-accent/20 p-1 rounded-full text-accent flex justify-center items-center text-xs font-bold">2</span>
            <span className="text-muted text-xs">Write a few sentences about yourself (or leave blank)</span>
          </div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-zinc-800 text-white border-none focus:ring-2 focus:ring-accent placeholder-gray-400 text-xs py-1 px-2"
            placeholder="e.g. Full stack developer, open source enthusiast."
          />
          <Button
            onClick={AnalyzeDescription}
            className="w-full cursor-pointer bg-black text-white font-medium py-1 rounded-md text-xs shadow-sm hover:bg-black hover:text-white active:bg-black active:text-white transition"
          >
            Generate Readme
          </Button>
        </div>
        {error && (
          <div className="w-full mt-3 text-xs text-red-400 bg-red-900/30 border border-red-700 rounded p-2 text-center">
            {error}
          </div>
        )}
      </div>
      {readme && !loading && (
        <div className="w-full flex flex-end items-center gap-2">
          <Button
            onClick={handleCopy}
            className="px-4 my-1 py-1 rounded-md cursor-pointer bg-black text-white font-medium text-xs shadow-sm hover:bg-black hover:text-white active:bg-black active:text-white transition"
          >
            {copied ? "Copied!" : "Copy Markdown"}
          </Button>
        </div>
      )}
      <div className="w-full flex justify-center">
        <div className="markdown-body max-w-2xl w-full bg-zinc-900/90 rounded-lg p-5 my-2 shadow-inner border border-zinc-800 text-xs overflow-auto" style={{fontFamily: 'DM Sans, Inter, Arial, sans-serif', minHeight: 120}}>
          {loading ? (
            <div className="flex justify-center items-center min-h-[100px] h-full"><Loading /></div>
          ) : (
            readme && <Markdown rehypePlugins={[rehypeHighlight]}>{readme}</Markdown>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
