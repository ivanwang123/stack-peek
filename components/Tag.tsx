import React from "react";

type PropType = {
  name: string;
};

function Tag(props: PropType) {
  const { name } = props;

  return (
    <a
      href={`https://www.npmjs.com/package/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mb-2 mr-1"
    >
      <div className="tag-font bg-tag text-link text-xs font-semibold px-2 py-1  rounded-full cursor-pointer hover:bg-blue-100 hover:shadow-sm">
        {name}
      </div>
    </a>
  );
}

export default Tag;
