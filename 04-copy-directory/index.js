const fs = require('fs');
const path = require('path');


fs.stat(path.join(__dirname, 'files-copy'), (err) => {
  if (err) {
    createCopy();
  } else {
    fs.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}, (err, files) => {
      if (err) throw err; 
      for (const file of files) {
        if (file.isFile()) {
          fs.unlink(path.join(__dirname, 'files-copy', file.name), (err) => {
            if (err) throw err;
          });
        }
      }
    });
    createCopy();
  }
});

function createCopy() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {
    if (err) throw err; 
    for (const file of files) {
      if (file.isFile()) {
        const src = path.join(__dirname, 'files', file.name);
        const dest = path.join(__dirname, 'files-copy', file.name);
        fs.copyFile(src, dest, (err) => {
          if (err) throw err;
        });
      }
    }
  });
}

