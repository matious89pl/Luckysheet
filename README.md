<div align="center">

![logo](/docs/.vuepress/public/img/logo_text.png)

</div>

# Maintained Luckysheet fork

This repository is a maintained fork of Luckysheet for teams that still depend on the original project and need fixes in the existing codebase. The focus here is practical maintenance: patch production bugs, keep the public API stable, and preserve the current integration model.

![Demo](/docs/.vuepress/public/img/LuckysheetDemo.gif)

## Fork scope

- Maintained here by the fork owners, not by the original Luckysheet team.
- Keeps the upstream Luckysheet architecture and browser API surface.
- Targets compatibility-focused fixes rather than a full product rewrite.
- Uses upstream material only as historical reference where it still helps.

## Fixed in this fork

- `borderInfo` growth during copy, fill, drag-move, and repeated border application.
- Broken `bd` range-format API behavior that wrote borders into cell data instead of `config.borderInfo`.
- Stale dropdown and data-validation metadata left behind after paste, fill-handle operations, and structural row or column moves.
- Dropdown validation bugs affecting checkbox validation, trimmed literal lists, and multi-select values sourced from ranges.
- Dropdown selection writes targeting the wrong cell when focus changed while the menu was open.
- Border export and copy edge cases around merged-cell left border handling.

## What this project is

Luckysheet is a browser spreadsheet UI with formatting, formulas, selection tools, validation, import and export, charts, pivot tables, and collaborative hooks. This fork keeps that base intact and focuses on making it more reliable for existing deployments.

## Using this fork

The safest path is to build from this repository and serve the generated assets from `dist/`.

### Build

```bash
npm install
npm install gulp -g
npm run build
```

### Include assets

```html
<link rel="stylesheet" href="/dist/plugins/css/pluginsCss.css" />
<link rel="stylesheet" href="/dist/plugins/plugins.css" />
<link rel="stylesheet" href="/dist/css/luckysheet.css" />
<link rel="stylesheet" href="/dist/assets/iconfont/iconfont.css" />
<script src="/dist/plugins/js/plugin.js"></script>
<script src="/dist/luckysheet.umd.js"></script>
```

### Create a container

```html
<div
  id="luckysheet"
  style="margin:0;padding:0;position:absolute;width:100%;height:100%;left:0;top:0;"
></div>
```

### Initialize

```html
<script>
  $(function () {
    var options = {
      container: "luckysheet",
    };

    luckysheet.create(options);
  });
</script>
```

## Development

### Requirements

- [Node.js](https://nodejs.org/en/) >= 6

### Install

```bash
npm install
npm install gulp -g
```

### Run the local dev build

```bash
npm run dev
```

### Build distributables

```bash
npm run build
```

### Build docs

```bash
npm run docs:build
```

## Repository workflow

- Open issues and pull requests against this fork, not the original Luckysheet repository.
- `CHANGELOG.md` tracks release history inherited from upstream; new fork work should be documented in commits and future fork releases.
- The active maintenance work in this fork currently centers on bug fixing and codebase stabilization.

## Legacy upstream references

These links are kept only as reference material for the original project. They are not owned or maintained by this fork.

- Upstream repository: [dream-num/Luckysheet](https://github.com/dream-num/Luckysheet)
- Upstream documentation: [LuckysheetDocs](https://dream-num.github.io/LuckysheetDocs/)
- Upstream user guide: [Wiki User Guide](https://github.com/mengshukeji/Luckysheet/wiki/User-Guide)
- Upstream online demo: [Luckysheet Demo](https://dream-num.github.io/LuckysheetDemo)

## License

[MIT](./LICENSE)
