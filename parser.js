import fs from 'fs';
import path from 'path'
import defaultOptions from './options.js';

const options = defaultOptions

export const file = {
    delete() {
        fs.unlink(options.fileName, (err) => {
            if(err) {
                console.log('File error deleted!')
            } else {
                console.log('File deleted successfully!')
            }
        })
    },
    create() {
        this.delete()
        fs.open(options.fileName, 'w', (err) => {
            if(err) throw err
            console.log(`The <${options.fileName}> file created`)
        })
    },
    add(path = '',text = '') {
        fs.appendFile(options.fileName, options.template({path, code:text}), (err) => {
            if(err) throw err;
        })
    }
}

const checkExpansion = (filePath = '') => {
    const expansion = path.extname(filePath)
    return !!options.include.expansions.find(ex => `.${ex}` === expansion)
}

export const magicRead = (path = options.codePath) => {
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

export default (mergeOptions = options) => {
    options = {...options, ...mergeOptions}
    file.create()
    magicRead()
}