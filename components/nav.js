import { useState } from "react";
import Tippy from "@tippyjs/react";
import copy from "clipboard-copy";
import "tippy.js/dist/tippy.css";

const Nav = ({ code, types, setTypes }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await copy(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 200);
    } catch {}
  };

  return (
    <nav className="p-10 flex justify-end align-center">
      <ul className="flex justify-end align-center">
        <li
          className={`${
            !copied ? "text-white" : "text-night-green"
          } hover:text-night-green pr-5`}
        >
          <div class="flex items-center">
            <button
              onClick={setTypes}
              type="button"
              class={`${
                types ? "bg-night-green" : "bg-gray-200"
              } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              aria-pressed="false"
              aria-labelledby="ts-types-label"
            >
              <span class="sr-only">Typescript Types</span>
              <span
                aria-hidden="true"
                class={`${
                  types ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
              ></span>
            </button>
            <span class="ml-3" id="ts-types-label">
              <span class="text-sm font-medium text-white">
                Show Typescript Types
              </span>
            </span>
          </div>
        </li>
        <li
          className={`${
            !copied ? "text-white" : "text-night-green"
          } hover:text-night-green`}
        >
          <Tippy content={copied ? "Copied" : "Copy to Clipboard"}>
            <button className="cursor-pointer" onClick={copyToClipboard}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </button>
          </Tippy>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
