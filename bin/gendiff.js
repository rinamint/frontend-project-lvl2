#!/usr/bin/env node
import program from 'commander';
import diffrenece from '../src/diff.js';

program
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstPath> <secondPath>')
  .action((firstPath, secondPath) => {
    const result = diffrenece(firstPath, secondPath, program.format);
    console.log(result);
  })
  .parse(process.argv);
