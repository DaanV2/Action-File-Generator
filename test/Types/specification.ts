import { expect } from "chai";
import { FileSpecification } from "../../source/Types/Specification";

describe("FileSpecification", () => {
  it("Cast No Errors1", () =>
    CastTestNoErrors({
      process: [
        {
          source: "template/set_data",
          destination: "data/set_1",
          replace: [{ old: "set_data", new: "set_1" }],
        },
      ],
    }));
  it("Cast No Errors2", () =>
    CastTestNoErrors({
      process: [
        {
          source: "template/set_data",
          destination: "data/set_1",
          replace: [{ old: "set_data", new: "set_1", path: false, content: false }],
        },
      ],
    }));

  it("Cast Error0", () => CastTestErrors({}));

  it("Cast Error1", () =>
    CastTestErrors({
      process: [
        {
          destination: "data/set_1",
          replace: [{ old: "set_data", new: "set_1", path: false, content: false }],
        },
      ],
    }));

  it("Cast Error2", () =>
    CastTestErrors({
      process: [
        {
          source: "template/set_data",
          replace: [{ old: "set_data", new: "set_1", path: false, content: false }],
        },
      ],
    }));

  it("Cast Error3", () =>
    CastTestErrors({
      process: [
        {
          source: "template/set_data",
          destination: "data/set_1",
        },
      ],
    }));

  it("Cast Error4", () =>
    CastTestErrors({
      process: [
        {
          source: "template/set_data",
          destination: "data/set_1",
          replace: [{ old: "set_data", path: false, content: false }],
        },
      ],
    }));

  it("Cast Error5", () =>
    CastTestErrors({
      process: [
        {
          source: "template/set_data",
          destination: "data/set_1",
          replace: [{ new: "set_1", path: false, content: false }],
        },
      ],
    }));

  it("Cast Error6", () =>
    CastTestErrors({
      process: [
        {
          source: "template/set_data",
          destination: "data/set_1",
          replace: { test: "string" },
        },
      ],
    }));
});

function CastTestNoErrors(value: any) {
  try {
    const test = FileSpecification.cast(value);
  } catch (err) {
    expect.fail("received an error on: " + err.message + "\n\tobject" + JSON.stringify(value));
  }
}

function CastTestErrors(value: any, message: string | undefined = undefined) {
  var error = undefined;
  try {
    const test = FileSpecification.cast(value);
  } catch (err) {
    error = err;
  }

  if (!error) {
    expect.fail("Expected an error, never received it");
    return;
  }

  if (message) {
    expect(error.message).to.equal(message);
  }
}
