/** */
export interface FileSpecification {
    /** */
    process: FileProcess[];
}
/** */
export interface FileProcess {
    /** */
    source: string;
    /** */
    destination: string;
    /** */
    replace: ReplaceSpecification[];
}
/** */
export interface ReplaceSpecification {
    /** */
    old: string;
    /** */
    new: string;
    /** */
    path: boolean;
    /** */
    content: boolean;
}
/** */
export declare namespace ReplaceSpecification {
    /**
     *
     * @param content
     * @param replace
     * @returns
     */
    function replaceContent(content: string, replace: ReplaceSpecification[]): string;
    /**
     *
     * @param filepath
     * @param replace
     * @returns
     */
    function replaceFilepath(filepath: string, replace: ReplaceSpecification[]): string;
}
/** */
export declare namespace FileSpecification {
    /**
     *
     * @param value
     */
    function cast(value: object): FileSpecification;
}
