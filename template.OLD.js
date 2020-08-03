// this is not a production script, this is used just for SAM templating
// eslint-disable-next-line import/no-extraneous-dependencies
const YAML = require('yaml');
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

const serverlessFunctions = getAllFiles('src/interface')
  .reduce((apis, file) => ({ ...apis, ...YAML.parse(fs.readFileSync(file, 'utf8')) }), {});

fs.readdirSync('/');

try {
  let base = fs.readFileSync('./sam-base.yml', 'utf8');
  base = YAML.parse(base);
  base.Resources = serverlessFunctions;
  const doc = YAML.stringify(base);

  fs.writeFileSync('template.yml', doc, 'utf8');
} catch (e) {
  stdout.write(e);
}

stdout.write('templete is done \n');
