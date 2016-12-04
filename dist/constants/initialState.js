'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.COMPONENT = exports.SCENE = exports.STAGE = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STAGE = exports.STAGE = _immutable2.default.Map({
    root: null,
    scenes: _immutable2.default.Map({})
});

var SCENE = exports.SCENE = _immutable2.default.Map({
    root: null,
    components: _immutable2.default.Map({})
});

var COMPONENT = exports.COMPONENT = _immutable2.default.Map({
    type: null,
    attrs: _immutable2.default.Map({}),
    events: _immutable2.default.Map({}),
    content: null
});