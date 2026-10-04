module.exports = async function (tp, action) {
  const base = tp.app.vault.adapter.getBasePath();
  const file = require('path').join(base, 'scripts', 'obsidian.cjs');
  return require(file).run(tp, action);
};
