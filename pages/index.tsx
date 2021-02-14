import React, { FormEvent, useState } from "react";
import Feed from "../components/Feed";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import OwnerCard from "../components/OwnerCard";
import { OwnerType } from "../types/customTypes";

function IndexPage() {
  const [search, setSearch] = useState<string>("");
  const [owner, setOwner] = useState<OwnerType | null>(null);
  const [username, setUsername] = useState<string>("");
  const [didSearch, setDidSearch] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (search.length) {
      fetch(`https://api.github.com/users/${search}`, {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const user = await res.json();
          const newOwner: OwnerType = {
            name: user.name,
            bio: user.bio,
            email: user.email,
            location: user.location,
            blog: user.blog,
            twitter_username: user.twitter_username,
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
          };
          setOwner(newOwner);
        })
        .catch((e) => console.log("GET USER ERROR", e));
      setUsername(search);
      setDidSearch(true);
    }
  };

  return (
    <Layout title="Stack Peek">
      <Navbar />
      <div className="grid grid-cols-12 px-4 sm:px-24 md:px-36 lg:px-24 xl:px-36">
        <section className="col-span-12 lg:col-span-5 lg:pr-8">
          <div className="w-full flex flex-col items-center border-b border-border-color lg:border-0 lg:sticky lg:top-24">
            <form
              className="w-full max-w-screen-sm flex items-center my-6"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="w-full border border-r-0 border-border-color rounded-l focus:border-blue-500"
                id="search"
                name="search"
                placeholder="Enter GitHub username"
                autoComplete="off"
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold border border-blue-500 px-5 py-1 rounded-r shadow active:bg-blue-600 active:border-blue-600 focus:outline-none"
              >
                Search
              </button>
            </form>
            {owner && <OwnerCard {...owner} />}
          </div>
        </section>
        <section className="col-span-12 lg:col-span-7">
          <Feed username={username} didSearch={didSearch} />
        </section>
      </div>
    </Layout>
  );
}

export default IndexPage;
