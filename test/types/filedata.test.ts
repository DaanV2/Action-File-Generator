import { expect } from "chai";
import path from "path";
import { FileData } from "../../source/types/filemap";

describe("Filedata", () => {
  it("collect", () => {
    const folder = path.join(__dirname, "..", "..", "..", "test", "files count check");

    //If this is true file path is wrong
    expect(folder.includes("lib\\test\\files count check")).to.not.be.true;
    expect(folder.includes("lib\\files count check")).to.not.be.true;

    const files = FileData.collect(folder, __dirname, []);

    console.log(folder);
    expect(files.length).to.equal(2);
  });
});
