'use strict';

// Flags: --expose-internals --expose_gc
// Note:
// - The --expose-internals flag is specific to Node.js core's
//   internal error system and is unnecessary for external users.
// - The --expose_gc flag is specific to the WPT stream tests

const { WPTRunner } = require('../common/wpt');
const runner = new WPTRunner('streams');
const whatwgStreamPath = require.resolve('../../');

runner.setFlags(['--expose-internals']);

runner.setInitScript(`
  const { internalBinding } = require('internal/test/binding');
  const { DOMException } = internalBinding('messaging');
  global.DOMException = DOMException;
  
  const whatwgStream = require(${JSON.stringify(whatwgStreamPath)});
  for (const [name, value] of Object.entries(whatwgStream)) {
    Object.defineProperty(global, name, {
      value,
      writable: true,
      configurable: true
    });
  }
`);

runner.runJsTests();
