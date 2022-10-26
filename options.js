export const options = {
    codePath: '../src',
    include: {
        folders: [],
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

export default options