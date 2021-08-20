"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const path_1 = __importDefault(require("path"));
const Filemap_1 = require("../../source/Types/Filemap");
describe("Filemap", () => {
    it("fixPath", () => {
        let file = Filemap_1.fixPath("temp/file.json", "C:/project");
        chai_1.expect(file).to.equal(path_1.default.join("C:/", "project", "temp", "file.json"));
        file = Filemap_1.fixPath("C:/temp/file.json", "C:/project");
        chai_1.expect(file).to.equal("C:/temp/file.json");
    });
});
//# sourceMappingURL=filemap.test.js.map