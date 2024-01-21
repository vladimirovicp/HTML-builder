const fs = require('node:fs');
const path = require('node:path');

const deleteDir = () => {

  fs.readdir(path.join(__dirname), (err, files) => {
    if (err) {
      console.log(err);
    }
    else {
      const dirExists = files.includes('files-copy');

      if (dirExists){
        fs.rm(path.join(__dirname, 'files-copy'),
          { recursive:true },
          (err) => {
            if(err){
              console.error(err);
            } else {
              //console.log('Папка files-copy удалена');
              createDir();
            }
          }
        );
      } else {
        createDir();
      }
    }
  })
}



const createDir = () =>{
  fs.mkdir(path.join(__dirname, 'files-copy'),
    (err) => {
      if (err) {
        return console.error(err);
      }
      //console.log('Папка files-copy создана!');
      startCopyFiles();
    });
}
const startCopyFiles = () => {
  fs.readdir(path.join(__dirname,'files'), (err, files) => {
    if (err) {
      console.log(err);
    }
    else {
      files.forEach(file => {
        const readStream = fs.createReadStream(path.join(__dirname,`files/${file}`))
        const writeStream = fs.createWriteStream(path.join(__dirname,`files-copy/${file}`))
        readStream.pipe(writeStream);
      })
      console.log('Файлы скопированы!')
    }
  })
}

deleteDir();













