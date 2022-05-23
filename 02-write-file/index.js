const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
stdout.write('Доброго времени суток! Напишите что-нибудь...\n');
stdin.on('data', data => {
  const str = data.toString();
  if (str.toLowerCase().trim() === 'exit') {
    stdout.write('Bye');
    process.exit();
  } else {
    stream.write(data);
  }
});
process.on('SIGINT', () => {
  stdout.write('Bye');
  process.exit();
});