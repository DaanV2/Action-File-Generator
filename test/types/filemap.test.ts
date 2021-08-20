import { expect } from "chai";
import path from "path";
import { Filemap, fixPath } from "../../source/types/filemap";

describe("Filemap", () => {
  it("fixPath", () => {
    let file = fixPath("temp/file.json", "C:/project");

    expect(file).to.equal(path.join("C:/", "project", "temp", "file.json"));

    file = fixPath("C:/temp/file.json", "C:/project");

    expect(file).to.equal("C:/temp/file.json");
  });

  it("duplicate check", () => {
    const mapper = new Filemap();

    mapper.add(
      {
        source: "template/main.js",
        destination: "/template/id/main.js",
        replace: [
          {
            new: "id_20",
            old: "id",
            content: true,
            path: true,
          },
        ],
      },
      "c:/test"
    );

    mapper.add(
      {
        source: "template/main.js",
        destination: "/template/data_set/main.js",
        replace: [
          {
            new: "id_20",
            old: "data_set",
            content: true,
            path: true,
          },
        ],
      },
      "c:/test"
    );

    if (mapper.files.size > 1) {
      let out = "{";
      mapper.files.forEach((m, k) => (out += k + ": " + JSON.stringify(m) + ","));

      out += "}";
      expect.fail(out);
    }
  });
});
