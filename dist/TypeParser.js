'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isNull2 = require('lodash/isNull');

var _isNull3 = _interopRequireDefault(_isNull2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _size2 = require('lodash/size');

var _size3 = _interopRequireDefault(_size2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _ComponentBuilder = require('./ComponentBuilder');

var _ComponentBuilder2 = _interopRequireDefault(_ComponentBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeParser = function () {
    function typeParser(ref) {
        _classCallCheck(this, typeParser);

        this.ref = ref;

        this.getData = this.getData.bind(this);
        this.renderSingle = this.renderSingle.bind(this);
        this.renderMulti = this.renderMulti.bind(this);
        this.typeParser = this.typeParser.bind(this);
        this.comparisonParser = this.comparisonParser.bind(this);
    }

    _createClass(typeParser, [{
        key: 'getData',
        value: function getData(id) {
            if (!(0, _isString3.default)(id)) throw new TypeError("Data identifier must be string: " + id);
            var _ref$props = this.ref.props,
                _ref$props$gData = _ref$props.gData,
                gData = _ref$props$gData === undefined ? {} : _ref$props$gData,
                Scene = _ref$props.Scene,
                Component = _ref$props.Component;
            var _Scene$data = Scene.data,
                sData = _Scene$data === undefined ? {} : _Scene$data;
            var _Component$data = Component.data,
                lData = _Component$data === undefined ? {} : _Component$data;

            var val = lData[id] || sData[id] || gData[id];
            return val;
        }
    }, {
        key: 'renderSingle',
        value: function renderSingle(id) {
            if ((0, _isUndefined3.default)(id)) return null;
            if (!(0, _isString3.default)(id)) throw new TypeError("Component identifier must be a string: " + id);
            var _ref$props2 = this.ref.props,
                Scene_ID = _ref$props2.Scene_ID,
                RComp = _ref$props2.RComp,
                resolveStage = _ref$props2.resolveStage;

            return _react2.default.createElement(_ComponentBuilder2.default, _extends({ key: id }, { Scene_ID: Scene_ID, Component_ID: id, RComp: RComp, resolveStage: resolveStage }));
        }
    }, {
        key: 'renderMulti',
        value: function renderMulti(components) {
            if ((0, _isString3.default)(components)) return this.renderSingle(components);
            if ((0, _size3.default)(components) == 0) return null;
            if ((0, _size3.default)(components) == 1) return this.renderSingle(components[1]);
            return components.map(this.renderSingle);
        }
    }, {
        key: 'typeParser',
        value: function typeParser(data) {
            var _this = this;

            if ((0, _isNull3.default)(data)) return null;
            if ((0, _isUndefined3.default)(data)) throw new TypeError("Tuple cannot be undefined");
            if (!(0, _isArray3.default)(data)) return data;
            if ((0, _isArray3.default)(data) && (0, _size3.default)(data) == 2) {
                switch (data[0]) {
                    case "value":
                        return data[1];
                    case "data":
                        if ((0, _isArray3.default)(data[1])) return data[1].map(this.getData);
                        return this.getData(data[1]);
                    case "component":
                        if ((0, _isArray3.default)(data[1])) return data[1].map(function (d) {
                            return _this.renderMulti(_this.typeParser(d));
                        });
                        return this.renderSingle(data[1]);
                    case "list":
                        if (!(0, _isArray3.default)(data[1])) throw new TypeError("Second argument of list must be an array: " + data);
                        return data[1].map(this.tpyeParser);
                    case "equal":
                        return this.comparisonParser(data[0], data[1]);
                    default:
                        throw new TypeError("Invalid Tuple Type" + data);
                }
            }
            throw new TypeError("Invalid Tuple: " + data);
        }
    }, {
        key: 'comparisonParser',
        value: function comparisonParser(type, data) {
            if (!(0, _isArray3.default)(data)) throw new TypeError("Comparison Tuple Data must be of type array: " + data);
            var args = data.map(typeParser);
            switch (type) {
                case "equal":
                    return _isEqual3.default.apply(undefined, _toConsumableArray(args));
                default:
                    throw new TypeError("Invalid Comparison Type");
            }
        }
    }]);

    return typeParser;
}();

exports.default = typeParser;