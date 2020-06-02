#!/usr/bin/env node
import program from 'commander';
import diffrenece from './diff.js';

program
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstPath> <secondPath>')
  .action((firstPath, secondPath) => {
    const result = diffrenece(firstPath, secondPath);
    console.log(result);
  });

program.parse(process.argv);
