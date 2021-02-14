import React from "react";
import { OwnerType } from "../types/customTypes";
import { formatNumber } from "../utils/numberFormatter";

function OwnerCard(props: OwnerType) {
  const {
    name,
    bio,
    email,
    location,
    blog,
    twitter_username,
    public_repos,
    followers,
    following,
    avatar_url,
    html_url,
  } = props;

  return (
    <article className="w-full max-w-screen-sm border border-border-color p-3 mb-6 rounded-lg ">
      <div className="inline-block">
        {name ? (
          <a
            className="hover:underline"
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center">
              <img
                className="w-8 h-8 text-font-secondary rounded-full"
                src={avatar_url}
                alt="avatar"
              />
              <h1 className="ml-3">{name}</h1>
            </div>
          </a>
        ) : (
          <h1 className="ml-3">User not found.</h1>
        )}
      </div>

      <p className="pt-1">{bio}</p>

      <div className="text-font-secondary my-2 pb-1 border-b">
        {email && (
          <span className="flex items-center mb-1">
            <img className="w-4 h-4 mr-1" src="/res/mail.svg" />
            {email}
          </span>
        )}
        {location && (
          <span className="flex items-center mb-1">
            <img className="w-4 h-4 mr-1" src="/res/map-pin.svg" />
            {location}
          </span>
        )}
        {blog && (
          <span className="inline-block mb-1">
            <a
              href={blog}
              className="flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="w-4 h-4 mr-1" src="/res/link.svg" />
              {blog}
            </a>
          </span>
        )}
        {twitter_username && (
          <>
            <br></br>
            <span className="inline-block mb-1">
              <a
                className="flex items-center hover:underline"
                href={`https://twitter.com/${twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="w-4 h-4 mr-1" src="/res/twitter.svg" />
                {twitter_username}
              </a>
            </span>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 text-font-secondary">
        <span className="flex items-center">
          <img className="w-4 h-4 mr-2" src="/res/git-repo.svg" />{" "}
          {formatNumber(public_repos)} repos
        </span>
        <span className="col-span-2 flex items-center">
          <img className="w-4 h-4 mr-2" src="/res/user-follow.svg" />{" "}
          {formatNumber(followers)} followers · {formatNumber(following)}{" "}
          following
        </span>
      </div>
    </article>
  );
}

export default OwnerCard;
