import { exception } from "console";

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
export namespace ReplaceSpecification {
  /**
   *
   * @param content
   * @param replace
   * @returns
   */
  export function replaceContent(content: string, replace: ReplaceSpecification[]): string {
    replace.forEach((rp) => {
      if (rp.content === true) {
        const rgold = new RegExp(rp.old, "gi");

        content = content.replace(rgold, rp.new);
      }
    });

    return content;
  }

  /**
   *
   * @param filepath
   * @param replace
   * @returns
   */
  export function replaceFilepath(filepath: string, replace: ReplaceSpecification[]): string {
    replace.forEach((rp) => {
      if (rp.path === true) {
        const rgold = new RegExp(rp.old, "gi");

        filepath = filepath.replace(rgold, rp.new);
      }
    });

    return filepath;
  }
}

/** */
export namespace FileSpecification {
  /**
   *
   * @param value
   */
  export function cast(value: object): FileSpecification {
    const out = <FileSpecification>value;

    /**Ensures the array is an arrau */
    if (!Array.isArray(out.process)) {
      throw new Error("expected a process array");
    } else {
      out.process.forEach((FP) => {
        if (FP.source === undefined) throw new Error("expected a source property");
        if (FP.destination === undefined) throw new Error("expected a destination property");
        if (FP.replace === undefined) throw new Error("expected a replace property");

        if (!Array.isArray(FP.replace)) throw new Error("expected a replace array");

        FP.replace.forEach((rps) => {
          if (rps.old === undefined) throw new Error("expected a old property");
          if (rps.new === undefined) throw new Error("expected a new property");

          if (rps.path === undefined) rps.path = true;
          if (rps.content === undefined) rps.content = true;
        });
      });
    }

    return out;
  }
}
