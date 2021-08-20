import FastGlob from "fast-glob";
import { fstat } from "fs";
import path from "path";
import { FileProcess, ReplaceSpecification } from "./specification";

/** */
export class Filemap {
  /** */
  readonly files: Map<string, FileData>;

  constructor() {
    this.files = new Map<string, FileData>();
  }

  /**
   *
   * @param spec
   * @param folder
   * @param replacements
   * @returns
   */
  public add(spec: FileProcess, folder: string): FileData[] {
    const source = fixPath(spec.source, folder);
    const destination = fixPath(spec.destination, folder);
    const replacements = spec.replace;

    const out = FileData.collect(source, destination, replacements);

    out.forEach((fp) => {
      this.files.set(fp.destination, fp);
    });

    return out;
  }
}

/**
 *
 */
export class FileData {
  /** */
  public source: string;
  /** */
  public destination: string;
  /** */
  public replacements: ReplaceSpecification[];

  /**
   *
   * @param source
   * @param destination
   * @param replacements
   */
  constructor(source: string, destination: string, replacements: ReplaceSpecification[]) {
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
  static create(source: string, destination: string, replacements: ReplaceSpecification[]): FileData {
    destination = ReplaceSpecification.replaceFilepath(destination, replacements);

    return new FileData(source, destination, replacements);
  }

  /**
   *
   * @param source
   * @param destination
   * @param replacements
   * @returns
   */
  static collect(source: string, destination: string, replacements: ReplaceSpecification[]): FileData[] {
    const files = FastGlob.sync(["*"], { cwd: source });
    const out: FileData[] = [];

    files.forEach((filepath) => {
      const sourceFile = filepath;
      const destinationFile = sourceFile.replace(source, destination);

      out.push(FileData.create(sourceFile, destinationFile, replacements));
    });

    return out;
  }
}

/**
 *
 * @param filepath
 * @param folder
 * @returns
 */
export function fixPath(filepath: string, folder: string): string {
  if (!path.isAbsolute(filepath)) {
    filepath = path.join(folder, filepath);
  }

  return filepath;
}
