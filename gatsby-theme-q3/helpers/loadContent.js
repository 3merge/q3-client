const fs = require('fs');
const path = require('path');

const readJsonFile = (dir, filename) => {
  try {
    const file = path.resolve(dir, filename);
    const buffer = fs.readFileSync(file);
    return JSON.parse(buffer);
  } catch (e) {
    return {};
  }
};

const reduceFileSystem = (name, next) =>
  fs
    .readdirSync(name, { withFileTypes: true })
    .reduce(next, {});

const getJsonFileNameFromDirent = ({ name }) =>
  path.basename(name, '.json');

const readFilePathFromDirent = ({ name }, root, next) =>
  next(path.join(root, name));

const recurseFileSystem = (pathName) =>
  reduceFileSystem(pathName, (curr, dirent) =>
    Object.assign(curr, {
      [getJsonFileNameFromDirent(
        dirent,
      )]: dirent.isDirectory()
        ? readFilePathFromDirent(
            dirent,
            pathName,
            recurseFileSystem,
          )
        : readJsonFile(pathName, dirent.name),
    }),
  );

recurseFileSystem.readJsonFile = readJsonFile;
recurseFileSystem.reduceFileSystem = reduceFileSystem;
recurseFileSystem.getJsonFileNameFromDirent = getJsonFileNameFromDirent;
recurseFileSystem.readFilePathFromDirent = readFilePathFromDirent;

module.exports = recurseFileSystem;
