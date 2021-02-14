import React, { useRef } from "react";
import RepoCard from "../components/RepoCard";
import { useInfiniteQuery } from "react-query";
import { RepoType } from "../types/customTypes";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { fetchRepos } from "../utils/feedFetcher";

type PropType = {
  username: string;
  didSearch: boolean;
};

function Feed(props: PropType) {
  const { username, didSearch } = props;

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(["repos", username], fetchRepos, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length === 0) return false;
      return pages.length + 1;
    },
    refetchOnWindowFocus: false,
  });

  const loadMoreBtnRef = useRef<HTMLButtonElement>(null);
  useIntersectionObserver({
    target: loadMoreBtnRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isLoading)
    return (
      <h1 className="text-xl text-gray-400 font-semibold text-center mt-12">
        Loading repos...
      </h1>
    );
  if (isError)
    return (
      <h1 className="text-xl text-gray-400 font-semibold text-center mt-12">
        Oops, error occured.
      </h1>
    );

  return (
    <div className="w-full flex flex-col items-center mt-8">
      {/* {!data && (
        <h2 className="text-xl text-gray-400 font-normal text-center mt-12">
          <span className="block text-9xl text-gray-300">(;-;)</span>
          <span className="block font-semibold mt-8">User not found.</span>
        </h2>
      )} */}
      {!didSearch && (
        <div>
          <img className="w-full px-16 mt-8" src="res/collaboration.svg" />
          <h1 className="text-2xl text-gray-400 text-center mt-8">
            See what &lt;stacks/&gt; coders are using
          </h1>
          <p className="text-base text-gray-400 text-center mt-4">
            Enter a GitHub username to see their repos
          </p>
        </div>
      )}
      {data?.pages[0]?.length ? (
        <h2 className="w-full text-gray-400 text-left mt-2 lg:mt-4">Repos</h2>
      ) : null}
      {data?.pages.map((page: (RepoType | null)[] | null) => {
        if (page) {
          return page.map((repo: RepoType | null) => {
            if (repo) {
              return <RepoCard {...repo} key={repo.name} />;
            }
            return null;
          });
        }
        return null;
      })}
      {data?.pages[0]?.length === 0 && didSearch && (
        <h2 className="text-xl text-gray-400 font-normal text-center mt-12">
          <span className="block text-9xl text-gray-300">(&gt;_&lt;)</span>
          <span className="block font-semibold mt-8">No repos found.</span>
        </h2>
      )}
      {hasNextPage && (
        <button
          type="button"
          className="w-full flex items-center justify-center text-xs text-font-secondary text-center bg-foreground border border-border-color py-2 mb-8 rounded cursor-pointer disabled:bg-gray-100 disabled:cursor-wait"
          ref={loadMoreBtnRef}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <>
              <img
                className="animate-spin w-4 h-4 mr-2"
                src="/res/loader.svg"
              />
              Loading...
            </>
          ) : (
            "Load more"
          )}
        </button>
      )}
    </div>
  );
}

export default Feed;
