const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if(err) throw err; 
  for (const file of files) {
    fs.stat(path.join(__dirname, 'secret-folder', `${file}`), function(err, stat) {
      if (err) throw err;
      if (stat.isFile()) {
        console.log(path.parse(file).name + ' - ' + path.parse(file).ext.slice(1) + ' - ' + stat.size + 'b');
      }
    });
  }
});