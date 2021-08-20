"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const fs = __importStar(require("fs"));
const Filemap_1 = require("./Filemap");
const Specification_1 = require("./Specification");
function Process(specfile, folder) {
    if (!fs.existsSync(specfile)) {
        throw new Error("cannot find spec file: " + specfile);
    }
    const content = fs.readFileSync(specfile).toString();
    const data = Specification_1.FileSpecification.cast(JSON.parse(content));
    const map = new Filemap_1.Filemap();
    data.process.forEach((p) => map.add(p, folder));
    map.files.forEach(executeFileProcess);
    return true;
}
exports.Process = Process;
function executeFileProcess(value, key) {
    console.log(`'${value.source}' => '${value.destination}'`);
    if (value.replacements.length <= 0) {
        fs.copyFileSync(value.source, value.destination);
    }
    else {
        let content = fs.readFileSync(value.source).toString();
        content = Specification_1.ReplaceSpecification.replaceContent(content, value.replacements);
        fs.writeFileSync(value.destination, content);
    }
}
//# sourceMappingURL=process.js.map