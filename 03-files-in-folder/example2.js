const fs = require('fs');
const path = require('path')

fs.stat(path.join(__dirname, 'secret-folder/text.txt'), (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  stats.isFile(); // true
  stats.isDirectory(); // false
  stats.isSymbolicLink(); // false
  stats.size; // 1024000 //= 1MB

  console.log(stats.size)

});
