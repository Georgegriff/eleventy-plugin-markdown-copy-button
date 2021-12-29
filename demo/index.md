<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet" />

# Automatic copy code

Modify the renderer and wrap it with the copy to clipboard component.

<style>
copy-component {
  position: relative;
  display: flex;
}

copy-component *:not([slot="button"]) {
  margin: 0;
}
copy-component button {
  position: absolute;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  top: 0;
  right: 0;
  border: none;
}

copy-component button:active {
  background: rgba(255, 255, 255, 0.7);
  color: black;
}
</style>

<div style="width: min(100%, 50rem)">

```js
module.exports = (eleventyConfig) => {
  const MarkdownCopyButton = require("eleventy-plugin-markdown-copy-button");
  eleventyConfig.addPlugin(MarkdownCopyButton);
};
```

</div>
