const fs = require('fs');
const path = require('path');

const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../uploads/', fileName);
    fs.readFile(filePath, 'base64', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  readFile
};