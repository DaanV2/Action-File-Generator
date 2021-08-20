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
  public add(spec: FileProcess, folder: string): FileData {
    let source = fixPath(spec.source, folder);
    let destination = fixPath(spec.destination, folder);
    let replacements = spec.replace;

    const out = FileData.create(source, destination, replacements);
    this.files.set(out.destination, out);

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
  static create(source: string, destination: string, replacements: ReplaceSpecification[]) {
    destination = ReplaceSpecification.replaceFilepath(destination, replacements);

    return new FileData(source, destination, replacements);
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
