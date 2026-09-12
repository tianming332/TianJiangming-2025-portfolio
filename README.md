# TJM 2025–2026 Portfolio Preview

这是按前一版演示布局还原的网页版本，已删除 MacBook Pro / iPad Pro 样机相关改动。

## 本地预览

直接双击 `index.html` 即可打开。

如果浏览器对本地脚本有限制，可在该文件夹运行：

```bash
python3 -m http.server 8000
```

然后访问：

http://localhost:8000

## UI interaction dependencies

The interface refinement takes visual and interaction cues from [Rare UI](https://rareui.com) and uses [morphicons](https://github.com/guillermolg00/morphicons) for stateful icon transitions. The source entry is `morph-ui.js`; rebuild the browser bundle with:

```bash
npm install
npm run build
```

The page remains plain HTML/CSS/JS and does not require a React runtime.
