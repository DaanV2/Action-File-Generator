import { expect } from "chai";
import path from "path";
import { fixPath } from "../../source/types/Filemap";

describe("Filemap", () => {
  it("fixPath", () => {
    let file = fixPath("temp/file.json", "C:/project");

    expect(file).to.equal(path.join("C:/", "project", "temp", "file.json"));

    file = fixPath("C:/temp/file.json", "C:/project");

    expect(file).to.equal("C:/temp/file.json");
  });
});
