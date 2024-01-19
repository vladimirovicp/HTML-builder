const fs = require('fs');
const path = require('path');

const { stdin, stdout, exit} = require('process');
const absPath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(absPath);
stdout.write('Hello! Please enter text...\n');
stdin.on('data', data => {
    if(data.toString().trim() === 'exit'){
        sayBye();
    }
    output.write(data);
});

process.on('STRING', sayBye);

function sayBye(){
    stdout.write('Happily!\n');
    exit();
}