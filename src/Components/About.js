import { useContext } from "react";
import ThemeContext from "./themeContext";

export default function About() {
  let { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme == "light" ? " dark:!bg-white" : " dark:!bg-slate-800"
      } ${theme == "light" ? "dark:!text-black" : "dark:!text-white"}`}
    >
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-10 border border-blue-100">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">
            About Me
          </h1>

          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            👋 Hi! I'm an aspiring{" "}
            <span className="text-indigo-600 font-semibold">
              JavaScript developer
            </span>{" "}
            who loves turning ideas into real web applications. I'm all about
            learning, building, and pushing the boundaries of what's possible
            with code.
          </p>

          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            My core stack includes{" "}
            <span className="text-blue-600 font-semibold">
              React, Tailwind CSS, and Node.js
            </span>
            . Lately, I’ve been diving into backend services and building
            full-stack projects to sharpen my skills.
          </p>

          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            I'm a firm believer in clean code, collaboration, and continuous
            improvement. One day at a time, one line at a time.
          </p>

          <h2 className="text-2xl font-bold text-indigo-700 mt-10 mb-4">
            🚀 Skills
          </h2>
          <ul className="grid grid-cols-2 gap-2 text-gray-700 list-disc list-inside">
            <li>JavaScript (ES6+)</li>
            <li>React & Hooks</li>
            <li>Tailwind CSS</li>
            <li>Node.js & Express</li>
            <li>REST APIs</li>
            <li>Git & GitHub</li>
          </ul>

          <h2 className="text-2xl font-bold text-indigo-700 mt-10 mb-4">
            📬 Let's Connect
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            I'm open to new opportunities, projects, or even a friendly chat
            about code!
          </p>

          <a
            href="mailto:vinu22149@gmail.com"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Email Me
          </a>
        </div>
      </div>
    </div>
  );
}
