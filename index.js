import fs from 'fs';
import path from 'path'

const options= {
    codePath: '../src',
    include: {
        expansions: ['js', 'ts', 'sass', 'scss', 'css', 'html', 'pug', 'svelte']
    },
    exclude: {
        names: [
            '.DS_Store'
        ],
    },
    template({path, code}) {
        return `
            \n\n\n=====file: "${path}" START=====
            \n${code}
            \n====file: "${path}" END=====
        `
    },
    fileName: 'patent.txt'
}

const file = {
    name: options.fileName,
    delete() {
        fs.unlink(this.name, (err) => {
            if(err) {
                console.log('File error deleted!')
            } else {
                console.log('File deleted successfully!')
            }
        })
    },
    create() {
        this.delete()
        fs.open(this.name, 'w', (err) => {
            if(err) throw err
            console.log(`The <${this.name}> file created`)
        })
    },
    add(path = '',text = '') {
        fs.appendFile(this.name, options.template({path, code:text}), (err) => {
            if(err) throw err;
        })
    }
}

const checkExpansion = (filePath = '') => {
    const expansion = path.extname(filePath)
    return !!options.include.expansions.find(ex => `.${ex}` === expansion)
}

const magicRead = (path = options.codePath) => {
    fs.readdir(path, (err, files) => {
        const isFile = !files
        if (isFile) {
            if (checkExpansion(path)) {
                fs.readFile(path, 'utf8', (err, data) => {
                    file.add(path,data)
                })
            } 
        } else {
            files?.forEach(file => {
                const filePath = `${path}/${file}`
                if (!options.exclude.names.includes(file)) {
                    magicRead(filePath)
                }
            })
        }
    });
}

file.create()
magicRead()