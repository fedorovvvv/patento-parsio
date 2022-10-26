# Patent parser

### Get Started
```bash
node index.js
```

### Настройка в index.js
```js
init({
    fileName: 'patent.txt'
})
```

Дефолтные настройки
```js
{
    codePath: '../src', //Путь с папке с кодом
    include: { //Включения
        folders: [], //Папки ['entities']
        expansions: ['js', 'ts', 'sass', 'scss', 'css', 'html', 'pug', 'json', 'svelte'] //Расширения
    },
    exclude: { //Исключения
        names: [ //Имена файлов/папок
            '.DS_Store'
        ],
    },
    template({path, code}) { //Шаблон для генерации блоков кода ({path:путь к файлу, code:содержимое файла})
        return `
            \n\n\n=====file: "${path}" START=====
            \n${code}
            \n====file: "${path}" END=====
        `
    },
    fileName: 'patent.txt' //Имя выходного файла
}
```
