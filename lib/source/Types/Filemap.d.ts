import { FileProcess, ReplaceSpecification } from "./Specification";
/** */
export declare class Filemap {
    /** */
    readonly files: Map<string, FileData>;
    constructor();
    /**
     *
     * @param spec
     * @param folder
     * @param replacements
     * @returns
     */
    add(spec: FileProcess, folder: string): FileData;
}
/**
 *
 */
export declare class FileData {
    /** */
    source: string;
    /** */
    destination: string;
    /** */
    replacements: ReplaceSpecification[];
    /**
     *
     * @param source
     * @param destination
     * @param replacements
     */
    constructor(source: string, destination: string, replacements: ReplaceSpecification[]);
    /**
     *
     * @param source
     * @param destination
     * @param replacements
     * @returns
     */
    static create(source: string, destination: string, replacements: ReplaceSpecification[]): FileData;
}
/**
 *
 * @param filepath
 * @param folder
 * @returns
 */
export declare function fixPath(filepath: string, folder: string): string;
