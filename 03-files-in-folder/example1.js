const fs = require('fs');
const path = require('path')

// https://www.geeksforgeeks.org/node-js-fs-readdir-method/

//В этом примере используется метод fs.readdir() для возврата имен файлов или файловых объектов в каталоге.
fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log("\nCurrent directory filenames:");
    files.forEach(file => {
      console.log(file);
    })
  }
})

fs.readdir(path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    console.log("\nCurrent directory files:");
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        console.log(file);
      })
    }
  })
