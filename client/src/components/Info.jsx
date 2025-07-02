import React from "react";

function Info() {
  return (
    <section className="card my-6">
      <h2 className="text-base font-semibold mb-2 text-accent">How QuickReadMe AI Works</h2>
      <ul className="flex flex-col gap-1 text-sm text-muted pl-4 list-disc">
        <li>🔍 Analyzes your GitHub profile and repositories in real-time.</li>
        <li>🧠 Summarizes your skills, activities, and strengths using advanced AI.</li>
        <li>🎨 Generates a beautiful, modern, and highly structured README.</li>
        <li>⚡ Instant copy and easy customization for your needs.</li>
        <li>🔒 No data stored—your privacy is respected.</li>
        <li>💡 100% free and open source for everyone.</li>
      </ul>
    </section>
  );
}

export default Info;
