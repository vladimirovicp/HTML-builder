const fs = require('node:fs');
const path = require('node:path')

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
        if(stats.isFile()){
          const ext = file.split('.').pop();
          const filename = path.parse(`secret-folder/${file}`).name;
          const size = Math.round(stats.size/ 1024); // kb
          //Примечание: округление размера файла не требуется; преобразование в кБ необязательно!
          console.log(`${filename} - ${ext} - ${size}kb`);
        }
      });
    })
  }
})
