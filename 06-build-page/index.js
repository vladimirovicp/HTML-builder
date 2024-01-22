const fs = require('node:fs');
const path = require('node:path');
const { stdout } = require("process");

const start = () => {
  fs.readdir(path.join(__dirname), (err, files) => {
    if (err) {
      console.log(err);
    }
    else {
      const dirExists = files.includes('project-dist');
      if (dirExists){
        fs.rm(path.join(__dirname, 'project-dist'),
          { recursive:true },
          (err) => {
            if(err){
              console.error(err);
            } else {
              console.log('Папка project-dist удалена!');
              createDir();
            }
          }
        );
      } else {
        console.log('Папка project-dist отсутствует!');
        createDir();
      }
    }
  })
}
const createDir = async () =>{
  await fs.mkdir(path.join(__dirname, 'project-dist'),
    (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Папка project-dist создана!');
      template();
      copyStyles();

      // fs.mkdir(path.join(__dirname, 'project-dist/assets'),

      fs.mkdir(path.join(__dirname, 'project-dist/assets'), { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        copyAssets('assets');
      });

      //copyAssets('assets');
    });
}
const template = () =>{
  const readStream = fs.createReadStream(path.join(__dirname,'template.html'))
  readStream.on('data', function(data){
    console.log('template сохранен в переменную!')
    recordTemplate(data.toString());
  });
}
const recordTemplate = (newTemplate) => {

  fs.readdir(path.join(__dirname,'components'), (err, files) => {
    if (err) {
      console.log(err);
    }
    else {
      let htmlFiles = [];
      files.forEach((file) => {
        if(file.split('.').pop() === 'html'){
          htmlFiles.push(file) ;
        }
      })

      let readTemplate = new Promise((resolve, reject) => {
        htmlFiles.forEach((file,index,array) => {
          const readStream2 = fs.createReadStream(path.join(__dirname,`components/${file}`));
          readStream2.on('data', function(data){
            newTemplate = newTemplate.replace(`{{${file.split('.').shift()}}}`, data.toString());
            if (index === array.length -1) resolve();
          });
        })
      });

      readTemplate.then(() => {
        console.log('Новый шаблон сформирован!');
        createIndex(newTemplate);

      });

    }
  })
}
const createIndex = (newTemplate) =>{
  fs.writeFile(path.join(__dirname,'project-dist/index.html'), newTemplate, function(error){
    if(error){  // если ошибка
      return console.log(error);
    }
    console.log("Файл index.html успешно записан в папке project-dist");
  });

}
const copyStyles = () => {
  const writeStreamCss = fs.createWriteStream(path.join(__dirname,'project-dist/style.css'));
  fs.readdir(path.join(__dirname,'styles'), (err, files) => {
    if (err) {
      console.log(err);
    }
    else {
      files.forEach(async (file) => {
        if(file.split('.').pop() === 'css'){
          const readStreamCss = fs.createReadStream(path.join(__dirname,`styles/${file}`))
          readStreamCss.pipe(writeStreamCss);
        }
      })
    }
  })
  console.log('Создано project-dist/style.css');
}

const copyAssets = (pathAsset) => {
  console.log('pathAsset',pathAsset)

  fs.readdir(path.join(__dirname,pathAsset), (err, files) => {
    if (err) {
      console.log(err);
    }
    else {
      files.forEach(file => {

        fs.stat(path.join(__dirname, `${pathAsset}/${file}`), (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          if(stats.isFile()){
            const readStreamAssets = fs.createReadStream(path.join(__dirname,`${pathAsset}/${file}`))
            const writeStreamAssets = fs.createWriteStream(path.join(__dirname,`project-dist/${pathAsset}/${file}`))
            readStreamAssets.pipe(writeStreamAssets);
            console.log(`Копирую файл ${file} `)

          } else {
            createDirAs(`${pathAsset}/${file}`);
          }
        });
      })
    }
  })
}

const createDirAs = (pathNewFolder) => {

  //console.log('pathNewFolder',pathNewFolder)
  //fs.mkdir(path.join(__dirname, 'pathNewFolder'), { recursive: true }, (err) => {

  fs.mkdir(path.join(__dirname, `project-dist/${pathNewFolder}`), { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    copyAssets(pathNewFolder);
  });
}



start();
