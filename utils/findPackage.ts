import { Base64 } from "js-base64";

// Search through repo directories to find package.json files
// Stores package.json files in packageJsons array as json obejcts
const findPackage = async (
  path: string,
  level: number,
  packageJsons: any[],
  username: string,
  repository: string
) => {
  if (level <= 2) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${username}/${repository}/contents/${path}`,
        {
          headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const files = await res.json();
      console.log(
        "Rate limit remaining:",
        res.headers.get("X-RateLimit-Remaining")
      );

      if (Array.isArray(files)) {
        const promises: any[] = [];
        files.forEach(async (file: any) => {
          if (file.type === "dir" || file.name === "package.json") {
            promises.push(
              findPackage(
                `${path}/${file.name}`,
                level + 1,
                packageJsons,
                username,
                repository
              )
            );
          }
        });
        await Promise.all(promises);
      } else {
        if (files.name === "package.json") {
          const content = Base64.decode(files.content);
          const json = JSON.parse(content);

          packageJsons.push(json);
        }
      }
    } catch (e) {
      console.log("SEARCH DIRECTORY ERROR", e);
    }
  }
};

export default findPackage;
