"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixPath = exports.FileData = exports.Filemap = void 0;
const path_1 = __importDefault(require("path"));
const specification_1 = require("./specification");
/** */
class Filemap {
    constructor() {
        this.files = new Map();
    }
    /**
     *
     * @param spec
     * @param folder
     * @param replacements
     * @returns
     */
    add(spec, folder) {
        let source = fixPath(spec.source, folder);
        let destination = fixPath(spec.destination, folder);
        let replacements = spec.replace;
        const out = FileData.create(source, destination, replacements);
        this.files.set(out.destination, out);
        return out;
    }
}
exports.Filemap = Filemap;
/**
 *
 */
class FileData {
    /**
     *
     * @param source
     * @param destination
     * @param replacements
     */
    constructor(source, destination, replacements) {
        this.source = source;
        this.destination = destination;
        this.replacements = replacements;
    }
    /**
     *
     * @param source
     * @param destination
     * @param replacements
     * @returns
     */
    static create(source, destination, replacements) {
        destination = specification_1.ReplaceSpecification.replaceFilepath(destination, replacements);
        return new FileData(source, destination, replacements);
    }
}
exports.FileData = FileData;
/**
 *
 * @param filepath
 * @param folder
 * @returns
 */
function fixPath(filepath, folder) {
    if (!path_1.default.isAbsolute(filepath)) {
        filepath = path_1.default.join(folder, filepath);
    }
    return filepath;
}
exports.fixPath = fixPath;
//# sourceMappingURL=filemap.js.map