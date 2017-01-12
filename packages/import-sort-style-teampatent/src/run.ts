#!/usr/bin/env node

import * as yargs from "yargs";

import {basename, dirname, extname, join} from "path";
import {lstatSync, readFileSync, realpathSync, writeFileSync} from "fs";
import sortImports, {ISortResult} from "import-sort";

import {walkSync} from "file";

const DIRECTORY_PATTERNS_TO_EXCLUDE = [""]

const argv = yargs.argv;

const style = require("./style").default,
    parser = require("import-sort-parser-typescript");

let directory = realpathSync(argv._[0]);
  const unsortedFiles: Array<string> = [];
  walkSync(directory, (baseDirectory, directories, fileNames) => {

    if (isNodeModulesDirectory(baseDirectory)) {
      return;
    }

    fileNames.forEach(fileName => {
        if (!isTypescriptFile(fileName)) {
            return;
        }

      const file = join(baseDirectory, fileName);

      const unsortedCode = readFileSync(file).toString("utf8");

      let sortResult: ISortResult | undefined;

      try {
        sortResult = sortImports(unsortedCode, parser, style);
      } catch (e) {
        return;
      }

      const {code: sortedCode, changes} = sortResult!;
      writeFileSync(file, sortedCode, {encoding: "utf-8"});

    });
  });

function isTypescriptFile(fileName) {
    return fileName.endsWith(".ts") && !fileName.endsWith(".d.ts");
}

function isNodeModulesDirectory(directory) {
    return directory.indexOf("node_modules") > -1;
}
