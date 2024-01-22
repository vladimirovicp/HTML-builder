const fs = require('node:fs');
const path = require('node:path');

const deleteDir = async () => {
    await fs.readdir(path.join(__dirname), (err, files) => {
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
      //startCopyFiles();
    });
}
const template = async () =>{
    const readStream = fs.createReadStream(path.join(__dirname,'template.html'))
    readStream.on('data', function(data){
        //let newTemplate = data.toString();
        //console.log(newTemplate)
        //return data.toString();
        recordTemplate(data.toString());
    });
}


const recordTemplate = (newTemplate) => {

    //console.log('recordTemplate');

    fs.readdir(path.join(__dirname,'components'), (err, files) => {
        if (err) {
          console.log(err);
        }
        else {
            var readTemplate = new Promise((resolve, reject) => {
                files.forEach(async (file,index,array) => {
                    if(file.split('.').pop() === 'html'){
                    //const readStream = fs.createReadStream(path.join(__dirname,`styles/${file}`))
                    //readStream.pipe(writeStream);

                    //console.log(file.split('.').shift());
                    //console.log(path.join(__dirname,`components/${file}`));

                    const readStream2 = fs.createReadStream(path.join(__dirname,`components/${file}`))
                    readStream2.on('data', function(data){
                            //console.log(data.toString());
                            newTemplate = newTemplate.replace(`{{${file.split('.').shift()}}}`, data.toString());
                            console.log('1')
                    });


                    

                    // const writeStreamHtml = fs.createWriteStream(path.join(__dirname,'project-dist/index.html'))
                    // readStream2.pipe(writeStreamHtml);





                    //console.log(readStream);
                    //   data = data.replace(`{{${file.split('.').shift()}}}`, readStream.toString());
                    //   console.log(data)
                    //console.log(`{{${file.split('.').shift()}}}`);
                    }

                    if (index === array.length -1) resolve();
                })
            });

            readTemplate.then(() => {
                console.log('All done!');
            });


        }
      })
}



const init = async() =>{
    await deleteDir(); // Если есть папка project-dist то удаляем и Создаем папку project-dist
    await template();
}

init();