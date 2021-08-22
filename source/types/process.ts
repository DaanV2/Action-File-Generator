import * as fs from "fs";
import { FileData, Filemap } from "./filemap";
import { FileSpecification, ReplaceSpecification } from "./specification";

export function Process(specfile: string, folder: string): boolean {
  if (!fs.existsSync(specfile)) {
    throw new Error("cannot find spec file: " + specfile);
  } else {
    console.log("reading spec file: " + specfile);
  }

  const content = fs.readFileSync(specfile).toString();
  const data = FileSpecification.cast(JSON.parse(content));
  const map = new Filemap();

  data.process.forEach((p) => map.add(p, folder));

  map.files.forEach(executeFileProcess);

  return true;
}

function executeFileProcess(value: FileData, key: string): void {
  console.log(`'${value.source}' => '${value.destination}'`);

  if (!fs.existsSync(value.source)) {
    console.error(`Cannot find file: ${value.source}`);
    return;
  }

  if (value.replacements.length <= 0) {
    fs.copyFileSync(value.source, value.destination);
  } else {
    let content = fs.readFileSync(value.source).toString();

    content = ReplaceSpecification.replaceContent(content, value.replacements);

    fs.writeFileSync(value.destination, content);
  }
}
