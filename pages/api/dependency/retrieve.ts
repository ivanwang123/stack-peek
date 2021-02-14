import { NextApiRequest, NextApiResponse } from "next";
import { DependecyType } from "../../../types/customTypes";
import findPackage from "../../../utils/findPackage";

const getDependencies = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, repository } = req.query;

  const packageJsons: any[] = [];

  try {
    await findPackage(
      "",
      0,
      packageJsons,
      username as string,
      repository as string
    );
  } catch (e) {
    console.log("FIND PACKAGE ERROR", e);
    res
      .status(500)
      .json({ alert: { msg: "Unable to find package.json", error: true } });
  }
  console.log("FOUND PACKAGE JSONS");

  const dependencies: DependecyType[] = [];
  for (let p = 0; p < packageJsons.length; p++) {
    const file: any = packageJsons[p];
    if (file.dependencies) {
      // let packageString = "";
      for (const [key, _value] of Object.entries(file.dependencies)) {
        // if (!key.includes("@")) {
        //   packageString += key + ",";
        // } else {
        //   dependencies.push({
        //     name: key,
        //     downloads: 0,
        //     npmUrl: `https://www.npmjs.com/package/${key}`,
        //   });
        // }
        dependencies.push({
          name: key,
          npmUrl: `https://www.npmjs.com/package/${key}`,
        });
      }

      // try {
      //   const res = await fetch(
      //     `https://api.npmjs.org/downloads/point/last-day/${packageString}`
      //   );
      //   const content: DownloadType[] = await res.json();

      //   for (const [key, value] of Object.entries(content)) {
      //     if (key.length && key !== "error" && value) {
      //       dependencies.push({
      //         name: key,
      //         downloads: value.downloads,
      //         npmUrl: `https://www.npmjs.com/package/${key}`,
      //       });
      //     }
      //   }
      // } catch (e) {
      //   console.log("NPM API ERROR", e);
      //   res.status(500).json({
      //     alert: { msg: "Unable to retrieve package data", error: true },
      //   });
      // }
    }
  }

  // Sort alphabetically
  // Replaces special characters with letter 'z' to force it to the end
  dependencies.sort((a, b) =>
    a.name.replace(/^\W+/, "z").localeCompare(b.name.replace(/^\W+/, "z"))
  );
  console.log("FOUND DEPENDENCIES");

  res.status(200).json({
    dependencies: dependencies,
    alert: {
      msg: `Successfully retrieved packages from ${repository}`,
      error: false,
    },
  });
};

export default getDependencies;
