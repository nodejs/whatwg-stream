'use strict';

const path = require('path');

exports.path = function(...args) {
  return path.join(__dirname, '..', 'fixtures', ...args);
};

