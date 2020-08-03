// this is not a production script, this is used just for SAM templating
// eslint-disable-next-line import/no-extraneous-dependencies
const mergeFiles = require('merge-files');
const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const getAllFiles = (dir) => fs.readdirSync(dir).reduce((files, file) => {
  const name = path.join(dir, file);
  const isDirectory = fs.statSync(name).isDirectory();
  const isDoc = name.substring(name.length - 7, name.length) === 'sam.yml';
  if (isDirectory) return [...files, ...getAllFiles(name)];
  if (isDoc) return [...files, name];
  return files;
}, []);

const templateParts = [
  './sam-base.yml',
  ...getAllFiles('src/interface'),
  './sam-output.yml',
];

console.log('templateParts', templateParts);

mergeFiles(templateParts, 'template.yml')
  .then((merged) => {
    if (!merged) stdout.write('Error merging template.yml');
    else stdout.write('SAM templete ready! \n\n');
  })
  .catch((e) => stdout.write(e));
