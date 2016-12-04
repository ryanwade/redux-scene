'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Implements Type Grammar found in README
 */
var TypeParser = function () {
    function TypeParser(renderComponent) {
        _classCallCheck(this, TypeParser);

        this.renderComponent = renderComponent;

        this.type = this.type.bind(this);
        this.typeDef = this.typeDef.bind(this);
        this.list = this.list.bind(this);
        this.identifier = this.identifier.bind(this);

        return this.type;
    }

    _createClass(TypeParser, [{
        key: 'type',
        value: function type(data) {
            if ((0, _isUndefined3.default)(data)) throw new TypeError("Tuple cannot be undefined");
            if (!this.typeDef(data)) return data;
            switch (data[0]) {
                case "list":
                    return this.list(data[1], this.type);
                case "component":
                    return this.list(data[1], this.identifier);
                case "value":
                    return data[1];
                default:
                    return data;
            }
        }
    }, {
        key: 'typeDef',
        value: function typeDef(data) {
            if ((0, _isNull3.default)(data)) return false;
            if (!(0, _isArray3.default)(data)) return false;
            if ((0, _size3.default)(data) !== 2) return false;
            if (!(0, _isString3.default)(data[0])) return false;
            return true;
        }
    }, {
        key: 'list',
        value: function list(data, parser) {
            if (!(0, _isArray3.default)(data)) return parser(data);
            return data.map(function (d) {
                return parser(d);
            });
        }
    }, {
        key: 'identifier',
        value: function identifier(data) {
            if (!(0, _isString3.default)(data)) throw new TypeError("Must Be Component Identifier");
            return this.renderComponent(data);
        }
    }]);

    return TypeParser;
}();

exports.default = TypeParser;