const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Hello! Please enter text...\n');

rl.on('line', (comand) =>{
    if(comand === 'exit'){
        stdout.write('Happily!\n');
        rl.close();
    }
    stream.write(comand + '\n');
});