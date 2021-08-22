import * as fs from "fs";
import * as core from "@actions/core";
import { Process } from "./types/process";

//Start code
try {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // token: ${{ secrets.GITHUB_TOKEN }}
  const Folder = core.getInput("folder", { required: false });
  const SpecFile = core.getInput("specification", { required: false });

  var result = false;

  console.log("starting on: " + Folder);

  //processing
  result = Process(SpecFile, Folder);

  if (fs.existsSync(Folder)) {
  } else {
    throw { message: "Couldn't not find folder: " + Folder };
  }

  if (result) {
    console.log("success");
  } else {
    console.log("failure");
    core.setFailed("no pages were created");
  }
} catch (error) {
  let message: string;

  if (error.message) message = error.message;
  else message = JSON.stringify(error);

  if (core) core.setFailed(message);
  else {
    console.log(message);
    process.exit(1);
  }
}
