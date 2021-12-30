# eleventy-plugin-markdown-copy-button

> Important: currently only works with the default 11ty library markdown-it.

```js
module.exports = (eleventyConfig) => {
  const MarkdownCopyButton = require("eleventy-plugin-markdown-copy-button");
  eleventyConfig.addPlugin(MarkdownCopyButton);
};
```

## Styling

However you do css style the components that are added however you like, for example:

```css
#copy-component {
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
```

## Custom text

If all you want to do is customise the text for the button you can do the following:

```js
module.exports = (eleventyConfig) => {
  const MarkdownCopyButton = require("eleventy-plugin-markdown-copy-button");
  eleventyConfig.addPlugin(MarkdownCopyButton, {
    copyText: "Copy text",
    copiedText: "Done!",
  });
};
```

## Custom html

So you want full control of the HTML? Go for it!

Internally this plugin uses `copy-component` from [npm](https://www.npmjs.com/package/copy-component), check out the [demos](https://griffa.dev/demos/copy-component/).

```js
module.exports = (eleventyConfig) => {
  const MarkdownCopyButton = require("eleventy-plugin-markdown-copy-button");
  eleventyConfig.addPlugin(MarkdownCopyButton, {
    renderer: (content) =>
      `<copy-component oncopy="this.querySelector('[slot=button]').textContent='${copiedText}'" style="display: block;">${content}<button slot="button">Copy</button></copy-component>`,
  });
};
```

## Options

Internally this plugin uses [eleventy-plugin-add-web-component-definitions](https://github.com/jdvivar/eleventy-plugin-add-web-component-definitions) which can be customised using `webComponentDefinitionsOptions`.

For example you could change the path to the copy-component

```js
module.exports = (eleventyConfig) => {
  const MarkdownCopyButton = require("eleventy-plugin-markdown-copy-button");
  eleventyConfig.addPlugin(MarkdownCopyButton, {
    webComponentDefinitionsOptions: {
      specifiers: {
        "copy-component": "https://cdn.skypack.dev/copy-component?min",
      },
    },
  });
};
```
