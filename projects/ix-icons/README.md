# Ix-Icons (1.0.0)

## Installation:

1. Add [ix-icons.1.0.0.tar.gz](../../dist/ix-icons.1.0.0.tar.gz) to /lib within angular project.

2. Update package.json/dependencies with

```
"ix-icons": "file:./lib/ix-icons.1.0.0.tar.gz"
```

3. run:

```
npm i
```

4. Update angular.json/assets with

```
{
    "glob": "**/*",
    "input": "./node_modules/ix-icons/ix-img/",
    "output": "./ix-img"
}
```

5. Add **IxIconModule** to Module Imports

## Available icons

- ix-export
- ix-file-html
- ix-file-doc
- ix-file-excel
- ix-file-pdf

## Add to layout with

    <mat-icon svgIcon="ix-file-html"></mat-icon>
