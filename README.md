# Patent parser

### Get Started
```bash
node index.js
```

### Настройки
```js
const options= {
    codePath: '../src', //Путь с папке с кодом
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
