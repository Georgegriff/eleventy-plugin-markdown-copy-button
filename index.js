const addWebComponentDefinitions = require("eleventy-plugin-add-web-component-definitions");
const { copyComponentRenderer } = require("./renderer");

const defaultRenderCopyComponent = (copyText, copiedText) => (content) =>
  copyComponentRenderer(content, copyText, copiedText);

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
    let markdownLibrary;
    const markdownOverride = eleventyConfig.libraryOverrides.md;
    const isMarkdownIt =
      Boolean(markdownOverride) &&
      markdownOverride.constructor &&
      markdownOverride.constructor.name === "MarkdownIt";
    if (markdownOverride && isMarkdownIt) {
      markdownLibrary = markdownOverride;
    } else if (markdownOverride && !isMarkdownIt) {
      throw new Error(
        "[eleventy-plugin-markdown-copy-plugin] error: Only markdown-it markdown engine is supported."
      );
    } else {
      // set lib in here, markdown-it comes from 11ty dependency
      markdownLibrary = require("markdown-it")({
        html: true,
      });
      eleventyConfig.setLibrary("md", markdownLibrary);
    }

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
