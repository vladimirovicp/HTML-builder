const fs = require('node:fs');
const path = require('node:path');

const writeStream = fs.createWriteStream(path.join(__dirname,'project-dist/bundle.css'))

fs.readdir(path.join(__dirname,'styles'), (err, files) => {
  if (err) {
    console.log(err);
  }
  else {
    files.forEach(async (file) => {
      if(file.split('.').pop() === 'css'){
        const readStream = fs.createReadStream(path.join(__dirname,`styles/${file}`))
        readStream.pipe(writeStream);
      }
    })
  }
})
