'use strict';

// Flags: --expose-internals --experimental-worker --expose_gc
// Note:
// - The --expose-internals flag is specific to Node.js core's
//   internal error system and is unnecessary for external users.
//   TODO: make it optional for WPTRunner.
// - The --experimental-worker flag is used to inform the
//   WPT harness that we are running tests in the Worker scope
//   so it doesn't use document.methods().
// - The --expose_gc flag is specific to the WPT stream tests

const path = require('path');
const { WPTRunner } = require('../common/wpt');

const runner = new WPTRunner('streams');

function loadReference(name) {
  const file = path.join(__dirname,
    '../../streams/reference-implementation/lib',
    name);
  return require(file);
}

runner.defineGlobal('ReadableStream', {
  value: loadReference('readable-stream.js').ReadableStream
});
runner.defineGlobal('WritableStream', {
  value: loadReference('writable-stream.js').WritableStream
});
runner.defineGlobal('TransformStream', {
  value: loadReference('transform-stream.js').TransformStream
});
runner.defineGlobal('ByteLengthQueuingStrategy', {
  value: loadReference('byte-length-queuing-strategy.js')
});
runner.defineGlobal('CountQueuingStrategy', {
  value: loadReference('count-queuing-strategy.js')
});
runner.defineGlobal('gc', {
  value: global.gc
});

runner.runJsTests();
