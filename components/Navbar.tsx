import React from "react";

function Navbar() {
  return (
    <nav className="sticky top-0 w-full h-12 flex items-center bg-white border-b border-border-color opacity-95 px-4 sm:px-24 md:px-36 lg:px-24 xl:px-36">
      <h1>Stack Peek()</h1>
      <button
        type="button"
        className="text-xs px-2 py-1 bg-foreground rounded ml-auto cursor-pointer hover:underline lg:hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>
    </nav>
  );
}

export default Navbar;
