"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSpecification = exports.ReplaceSpecification = void 0;
/** */
var ReplaceSpecification;
(function (ReplaceSpecification) {
    /**
     *
     * @param content
     * @param replace
     * @returns
     */
    function replaceContent(content, replace) {
        replace.forEach((rp) => {
            if (rp.content === true) {
                const rgold = new RegExp(rp.old, "gi");
                content = content.replace(rgold, rp.new);
            }
        });
        return content;
    }
    ReplaceSpecification.replaceContent = replaceContent;
    /**
     *
     * @param filepath
     * @param replace
     * @returns
     */
    function replaceFilepath(filepath, replace) {
        replace.forEach((rp) => {
            if (rp.path === true) {
                const rgold = new RegExp(rp.old, "gi");
                filepath = filepath.replace(rgold, rp.new);
            }
        });
        return filepath;
    }
    ReplaceSpecification.replaceFilepath = replaceFilepath;
})(ReplaceSpecification = exports.ReplaceSpecification || (exports.ReplaceSpecification = {}));
/** */
var FileSpecification;
(function (FileSpecification) {
    /**
     *
     * @param value
     */
    function cast(value) {
        const out = value;
        /**Ensures the array is an arrau */
        if (!Array.isArray(out.process)) {
            throw new Error("expected a process array");
        }
        else {
            out.process.forEach((FP) => {
                if (FP.source === undefined)
                    throw new Error("expected a source property");
                if (FP.destination === undefined)
                    throw new Error("expected a destination property");
                if (FP.replace === undefined)
                    throw new Error("expected a replace property");
                if (!Array.isArray(FP.replace))
                    throw new Error("expected a replace array");
                FP.replace.forEach((rps) => {
                    if (rps.old === undefined)
                        throw new Error("expected a old property");
                    if (rps.new === undefined)
                        throw new Error("expected a new property");
                    if (rps.path === undefined)
                        rps.path = true;
                    if (rps.content === undefined)
                        rps.content = true;
                });
            });
        }
        return out;
    }
    FileSpecification.cast = cast;
})(FileSpecification = exports.FileSpecification || (exports.FileSpecification = {}));
//# sourceMappingURL=specification.js.map