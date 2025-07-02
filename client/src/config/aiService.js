import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
# 🖐️ Hi, I'm [Name]

---

**Always exploring, always improving — I enjoy creating, fixing, and figuring things out.**

<p align="center">
  <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" width="200"/>
</p>

---

### 🌐 Connect with me:
<p align="left">
  <a href="https://github.com/yourusername"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"/></a>
  <a href="https://linkedin.com/in/yourusername"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white"/></a>
  <a href="mailto:your@email.com"><img src="https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white"/></a>
  <!-- Add more badges as needed -->
</p>

---

### 🛠️ Languages and Tools:
<p align="left">
  <img src="https://img.shields.io/badge/C%2B%2B-00599C?style=flat&logo=c%2B%2B&logoColor=white"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white"/>
  <!-- Add more badges as needed -->
</p>

---

### 📊 GitHub Stats:
<p align="left">
  <img src="https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=github_dark" height="150"/>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=yourusername&theme=github-dark&hide_border=true" height="150"/>
</p>

---

> _"Add a fun quote or something unique about yourself here!"_

---

**Instructions:**
- Use this format for all generated READMEs.
- Center images and badges where appropriate.
- Use markdown best practices for dark themes and visual clarity.
- Replace placeholders with user data if available.
- Keep it visually appealing, concise, and easy to copy.
  `,
});

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    throw new Error("AI service failed. Please check your API key, network connection, or try again later.");
  }
}

export default generateContent;
