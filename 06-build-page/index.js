const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, template) => {
  if (err) throw err;

  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    if (err) throw err; 
    for (const file of files) {
      let str = path.parse(file).name;
      fs.readFile(path.join(__dirname, 'components', path.parse(file).base), 'utf-8', (err, component) => {
        if (err) throw err;
        template = template.replace(`{{${str}}}`, component); 
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, err => {
          if (err) throw err;
        });
      });
    }
  });
});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err; 
  for (const file of files) {
    fs.stat(path.join(__dirname, 'styles', `${file}`), function(err, stat) {
      if (err) throw err;
      if (stat.isFile() && path.parse(file).ext == '.css') {
        fs.readFile(path.join(__dirname, 'styles', `${file}`), (err, data) => {
          if (err) throw err;
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'style.css'),
            data,
            (err) => {
              if (err) throw err;
            });
        });
      }
    });
  }
});

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true},  err => {
  if (err) throw err;
});
fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if (file.isDirectory()) {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name), {recursive: true},  err => {
        if (err) throw err;
        copyFiles(path.join(__dirname, 'assets',file.name), path.join(__dirname, 'project-dist', 'assets',file.name));
      }
      );
    }
  }
}
);

function copyFiles(pathToSrc, pathToDest) {
  fs.readdir(pathToSrc, {withFileTypes: true}, (err, files) => {
    if(err) throw err;
    for (const file of files) {
      const src = path.join(pathToSrc, file.name);
      const dest = path.join(pathToDest, file.name);
      fs.copyFile(src, dest, (err) => {
        if (err) throw err;
      });
    }
  });
}