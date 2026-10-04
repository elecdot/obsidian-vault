'use strict';
for (const file of require('node:fs').readdirSync(__dirname).filter(f=>f.endsWith('.test.cjs')).sort()) require(`./${file}`);
