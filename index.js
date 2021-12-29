const addWebComponentDefinitions = require("eleventy-plugin-add-web-component-definitions");

const defaultRenderCopyComponent = (copyText, copiedText) => (content) => {
  return `<copy-component oncopy="this.querySelector('[slot=button]').textContent='${copiedText}'" style="display: block;">${content}<button style="text-transform: uppercase" slot="button">${copyText}</button></copy-component>`;
};

module.exports = {
  initArguments: {},
  configFunction: (
    eleventyConfig,
    {
      copyText = "Copy",
      copiedText = "Copied",
      renderer = defaultRenderCopyComponent(copyText, copiedText),
      webComponentDefinitionsOptions,
    } = {}
  ) => {
    eleventyConfig.addPlugin(addWebComponentDefinitions, {
      specifiers: {
        "copy-component": "https://cdn.skypack.dev/copy-component?min",
      },
      ...webComponentDefinitionsOptions,
    });
    let markdownIt = require("markdown-it");
    markdownLibrary = markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    });

    // Remember old renderer, if overridden, or proxy to default renderer
    const defaultCodeRender =
      markdownLibrary.renderer.rules.fence ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

    markdownLibrary.renderer.rules.fence = (...args) => {
      return renderer(defaultCodeRender(...args));
    };
    eleventyConfig.setLibrary("md", markdownLibrary);
  },
};
