# Ix-Icons (1.0.0)

## Installation:

Add [ix-icons.1.0.0.tar.gz](../dist/ix-icons.1.0.0.tar.gz) to /lib within angular project.

Update package.json/dependencies with

```
"ix-icons": "file:./lib/ix-icons.1.0.0.tar.gz"
```

run:

```
npm i
```

Update angular.json/assets with

```
{
    "glob": "**/*",
    "input": "./node_modules/ix-icons/ix-img/",
    "output": "./ix-img"
}
```

## Available icons

- ix-export
- ix-file-html
- ix-file-doc
- ix-file-excel
- ix-file-pdf
