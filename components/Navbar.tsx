import React from "react";

function Navbar() {
  return (
    <nav className="sticky top-0 w-full h-12 flex items-center bg-white border-b border-border-color opacity-95 px-4 sm:px-24 md:px-36 lg:px-24 xl:px-36">
      <h1 className="flex items-center text-button-color">
        <img className="w-5 h-5 mr-2" src="res/stack.svg" />
        Stack Peek()
      </h1>
      <button
        type="button"
        className="text-xs px-2 py-1 shadow-none rounded ml-auto cursor-pointer hover:underline lg:hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>
    </nav>
  );
}

export default Navbar;
