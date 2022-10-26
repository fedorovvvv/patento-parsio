# patentParser
```js
const options= {
    codePath: './src', //Путь с папке с кодом
    include: { //Включения
        expansions: ['js', 'ts', 'sass', 'scss', 'css', 'html', 'pug', 'json', 'svelte'] //Расширения
    },
    exclude: { //Исключения
        names: [ //Имена файлов/папок
            '.DS_Store'
        ],
    }
}
```
