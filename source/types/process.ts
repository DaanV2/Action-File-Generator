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

  map.files.forEach((value) => executeFileProcess(value, folder));

  return true;
}

function executeFileProcess(value: FileData, folder: string): void {
  console.log(`'${value.source.replace(folder, "")}' => '${value.destination.replace(folder, "")}'`);

  if (!fs.existsSync(value.source.replace(folder, ""))) {
    console.error(`Cannot find file: ${value.source.replace(folder, "")}`);
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
