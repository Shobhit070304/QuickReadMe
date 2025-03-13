import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Loading from "./Loading";
import generateContent from "../config/aiService";

function Hero() {
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");

  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState();

  async function AnalyzeDescription() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: { Authorization: import.meta.env.VITE_GITHUB_API },
        }
      );
      const readmeContent = await generateContent(description);
      setReadme(readmeContent);
      setLoading(false);
    } catch (error) {
      console.error("Error : " + error.message);
      setLoading(false);
    }
  }

  async function AnalyzeProfile() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: { Authorization: import.meta.env.VITE_GITHUB_API },
        }
      );
      const readmeContent = await generateContent(response.data.bio);
      setReadme(readmeContent);
      setLoading(false);
    } catch (error) {
      console.error("Error : " + error.message);
      setLoading(false);
    }
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(readme)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="flex flex-col items-center mb-20">
      <div className="px-3 w-50 mt-30 py-2 flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 shadow-md shadow-gray-300 hover:shadow-2xl">
        <a href="https://github.com/Shobhit070304">
          <img
            className="w-10 rounded-full"
            src="data:image/png;base64,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"
            alt=""
          />
        </a>
        <a href="">Star on Github</a>
      </div>
      <div className="text-6xl font-bold flex flex-col items-center mt-8">
        <p>Generate GitHub Profile</p>
        <p>README with GPT</p>
      </div>
      <p className="mt-4 text-gray-500">200+ Profiles generated so far</p>

      <div className="my-8">
        <div className="flex flex-col gap-8">
          <div className="flex gap-2 items-center">
            <p className="w-8 h-8 bg-black p-2 rounded-full text-white flex justify-center items-center">
              1
            </p>
            <p>Let AI Summary your Github Activity and repo with one-click</p>
          </div>
          <Input
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="w-full"
            placeholder="Enter your github username"
          />
          <Button onClick={AnalyzeProfile} className="w-full cursor-pointer">
            Let AI analysis Your Github Profile
          </Button>
        </div>
        <div className="flex flex-col gap-8 mt-8">
          <div className="flex gap-2 items-center">
            <p className="w-8 h-8 bg-black p-2 rounded-full text-white flex justify-center items-center">
              2
            </p>
            <p>
              Write a few sentences about yourself(or leave it blank and we'll
              generate somehthing for you )
            </p>
          </div>
          <Textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-full"
            placeholder="eg. I am a Full stack developer with 5+ years of expirience in developing production applications and software."
          />
          <Button
            onClick={AnalyzeDescription}
            className="w-full cursor-pointer"
          >
            Generate Github Profile Readme
          </Button>
        </div>
      </div>
      {readme ? (
        <div className="w-full flex flex-end">
          <Button
            onClick={handleCopy}
            className="px-6 my-2 py-2 rounded-2xl cursor-pointer bg-zinc-900 text-white"
          >
            Copy
          </Button>
        </div>
      ) : null}
      {readme ? (
        <div className="right w-full md:w-full bg-zinc-700 text-white rounded-md p-4 overflow-auto">
          {loading ? (
            <Loading />
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{readme}</Markdown>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Hero;
