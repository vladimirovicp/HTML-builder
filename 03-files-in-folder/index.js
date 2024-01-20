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

      fs.stat(path.join(__dirname, `secret-folder/${file}`), (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        //stats.isFile(); // true

        if(stats.isFile()){

          //const filename = path.parse(`secret-folder/${file}`).name;
          //const ext = path.parse(`secret-folder/${file}`).ext;
          const ext = file.split('.').pop();
          const filename = file.split('.').shift();
          const size = stats.size;
          console.log(`${filename} - ${ext} - ${size}`);

          //console.log(stats.size);
        }

        // stats.isDirectory(); // false
        // stats.isSymbolicLink(); // false
        // stats.size; // 1024000 //= 1MB
        //
        // console.log(stats.size)

      });


      //console.log(file);


    })
  }
})
