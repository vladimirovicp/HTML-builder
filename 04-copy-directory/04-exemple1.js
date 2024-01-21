//создание папки

const fs = require('fs');
const path = require('path');



fs.mkdir(path.join(__dirname, 'files-copy'),
  (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Папка files-copy создана!');
  });


//удаление папки

fs.rm(path.join(__dirname, 'files-copy'),
  { recursive:true },
  (err) => {
    if(err){
      console.error(err);
    } else {
      console.log('Папка files-copy удалена');
    }

  }

);



