import React from "react";

function Info() {
  return (
    <div className="my-12">
      <h1 className="text-2xl font-bold mb-4">How the AI Works:</h1>
      <div className="flex flex-col gap-2 text-gray-500">
        <p>
          1. Fetches and analyzes the user's repositories to understand their
          project involvement.{" "}
        </p>
        <p>
          2. Retrieves profile details to gain insights into their skills and
          professional journey.
        </p>
        <p>
          3. Examines contribution patterns, frequency, and key areas of
          expertise.
        </p>
        <p>
          4. Summarizes activities, projects, and strengths into a detailed
          overview.
        </p>
        <p>
          5. Generates a well-structured GitHub profile README that showcases
          contributions and skills effectively.
        </p>
      </div>
    </div>
  );
}

export default Info;
