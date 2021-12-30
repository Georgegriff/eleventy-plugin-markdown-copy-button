module.exports.copyComponentRenderer = (content, copiedText, copyText) => {
  return `<copy-component oncopy="this.querySelector('[slot=button]').textContent='${copiedText}'" style="display: block;">${content}<button style="text-transform: uppercase" slot="button">${copyText}</button></copy-component>`;
};
