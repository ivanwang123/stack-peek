import React, { useState } from "react";
import Tag from "./Tag";
import { RepoType } from "../types/customTypes";
import date from "date-and-time";
// import { convertSizeToStr } from "../utils/sizeConverter";

const MAX_PREVIEW_TAGS = 12;

function RepoCard(props: RepoType) {
  const {
    name,
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    html_url,
    // stargazers_count,
    // size,
    created_at,
    dependencies,
  } = props;

  const [allTags, setAllTags] = useState<boolean>(false);

  let tagsBody = null;
  if (dependencies)
    if (dependencies.length <= MAX_PREVIEW_TAGS) {
      tagsBody = (
        <>
          {dependencies.map((dependency) => {
            return <Tag name={dependency.name} key={dependency.name} />;
          })}
        </>
      );
    } else {
      if (allTags) {
        tagsBody = (
          <>
            {dependencies.map((dependency) => {
              return <Tag name={dependency.name} key={dependency.name} />;
            })}
            <span
              className="text-xs text-font-secondary ml-2 whitespace-nowrap cursor-pointer hover:underline"
              onClick={() => setAllTags(false)}
            >
              Show less
            </span>
          </>
        );
      } else {
        tagsBody = (
          <>
            {dependencies.slice(0, MAX_PREVIEW_TAGS).map((dependency) => {
              return <Tag name={dependency.name} key={dependency.name} />;
            })}
            <span
              className="text-xs text-font-secondary ml-2 whitespace-nowrap cursor-pointer hover:underline"
              onClick={() => setAllTags(true)}
            >
              Show {dependencies.length - MAX_PREVIEW_TAGS} more...
            </span>
          </>
        );
      }
    }

  return (
    <article className="w-full max-w-screen-sm border border-border-color my-4 rounded-lg ">
      {/* PROJECT INFO */}
      <div className="p-3 bg-foreground rounded-lg">
        <div className="flex">
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            <h1 className="inline-block text-lg text-font-primary cursor-pointer hover:underline">
              {name}
            </h1>
          </a>
          <div className="flex flex-col ml-auto">
            <span className="text-xs text-gray-400 ml-auto">
              {date.format(new Date(created_at), "MMM DD, YYYY")}
            </span>
            {/* <span className="text-xs text-gray-400 ml-auto">
              {convertSizeToStr(size)}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              {stargazers_count} stars
            </span> */}
          </div>
        </div>
        <p className="text-sm text-font-secondary overflow-text break-words mt-1">
          {description}
        </p>
      </div>

      {/* TECHNOLOGIES INFO */}
      <div className="bg-white border-t border-border-color p-3 pb-2 rounded-b-lg">
        {tagsBody}
      </div>
    </article>
  );
}

// function DependencyTags(
//   dependencies: DependecyType[],
//   allTags: boolean
// ): ReactNode {
//   if (dependencies.length <= MAX_PREVIEW_TAGS) {
//     return (
//       <>
//         {dependencies.map((dependency) => {
//           return <Tag name={dependency.name} key={dependency.name} />;
//         })}
//       </>
//     );
//   }
//   if (allTags) {
//     return (
//       <>
//         {dependencies.map((dependency) => {
//           return <Tag name={dependency.name} key={dependency.name} />;
//         })}
//       </>
//     );
//   } else {
//     return (
//       <>
//         {dependencies.slice(0, MAX_PREVIEW_TAGS).map((dependency) => {
//           return <Tag name={dependency.name} key={dependency.name} />;
//         })}
//         <span className="text-font-secondary ml-2 cursor-pointer hover:underline">
//           View {dependencies.length - MAX_PREVIEW_TAGS} more...
//         </span>
//       </>
//     );
//   }
// }

export default RepoCard;
