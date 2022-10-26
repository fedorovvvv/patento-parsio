import fs from 'fs';
import path from 'path'
import defaultOptions from './options.js';

let options = defaultOptions

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

const check = {
    include: {
        expansion(filePath = '') {
            if (options.include?.expansion?.length > 0) {
                const expansion = path.extname(filePath)
                return !!options.include.expansions.find(ex => `.${ex}` === expansion)
            } else {
                return true
            }
        },
        folder(filePath = '') {
            if (options.include?.folders?.length > 0) {
                return options.include.folders.some(folder => filePath.includes(`${folder}/`))
            } else {
                return true
            }
        }
    },
    exclude: {
        names(file = '') {
            if (options.exclude?.names?.length > 0) {
                return !options.exclude.names.includes(file)
            } else {
                return true
            }
        }
    }
}

export const magicRead = (path = options.codePath) => {
    fs.readdir(path, (err, files) => {
        const isFile = !files
        if (isFile) {
            if (check.include.expansion(path) && check.include.folder(path)) {
                fs.readFile(path, 'utf8', (err, data) => {
                    file.add(path,data)
                })
            } 
        } else {
            files?.forEach(file => {
                const filePath = `${path}/${file}`
                if (check.exclude.names(file)) {
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