const fs = require('fs');
const path = require('path');

const styleStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');
let data = '';
fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err; 
  for (const file of files) {
    fs.stat(path.join(__dirname, 'styles', `${file}`), function(err, stat) {
      if (err) throw err;
      if (stat.isFile() && path.parse(file).ext == '.css') {
        const stream = fs.createReadStream(path.join(__dirname, 
          'styles', `${file}`), 'utf-8');
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => {
          styleStream.write(data);
        });
      }
    });
  }
});