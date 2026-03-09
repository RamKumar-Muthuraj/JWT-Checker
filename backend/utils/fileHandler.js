const fs = require("fs");

const readJSON = (filePath) => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const readTEXT = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const writeTEXT = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, "utf-8", (err) => {
      if (err) reject(err);
      else resolve("File written successfully");
    });
  });
};

const appendTEXT = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, data, "utf-8", (err) => {
      if (err) reject(err);
      else resolve("Data appended successfully");
    });
  });
};


module.exports = {
  readJSON,
  writeJSON,
  readTEXT,
  writeTEXT,
  appendTEXT
};
