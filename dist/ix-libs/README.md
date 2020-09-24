# Ix-Libs

## Ix-Icons

### Installation:

1. Add .npmrc with the following

```
registry=http://istfs:8080/tfs/DefaultCollection/_packaging/IX-libs/npm/registry/
always-auth=true
```

2. run:

```
npm install @ix/icons
```

3. Update angular.json/assets with

```
{
    "glob": "**/*",
    "input": "./node_modules/ix-icons/ix-img/",
    "output": "./ix-img"
}
```

4. Add **IxIconsModule** to Module Imports

### Available icons

- ix-export
- ix-dialog
- ix-file-html
- ix-file-doc
- ix-file-excel
- ix-file-pdf

### Add to layout with

    <mat-icon svgIcon="ix-file-html"></mat-icon>

## Ix-Scroll (1.0.0)

### Installation:

1. Add .npmrc with the following

```
registry=http://istfs:8080/tfs/DefaultCollection/_packaging/IX-libs/npm/registry/
always-auth=true
```

2. run:

```
npm install @ix/scroll
```

4. Add **IxScrollModule** to Module Imports

### Add to layout with

```
<ix-scroll-top-button [color]="accent"></ix-scroll-top-button>
```

_Note: [color] can be accent or primary_
