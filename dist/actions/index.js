'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.component = exports.scene = exports.stage = undefined;

var _stage = require('./stage');

var stage = _interopRequireWildcard(_stage);

var _scene = require('./scene');

var scene = _interopRequireWildcard(_scene);

var _component = require('./component');

var component = _interopRequireWildcard(_component);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.stage = stage;
exports.scene = scene;
exports.component = component;