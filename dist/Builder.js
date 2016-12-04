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

var _elements = require('./elements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {
    function Builder(RComp, resolve, dispatch) {
        _classCallCheck(this, Builder);

        this.RComp = RComp;
        this.resolve = resolve;
        this.dispatch = dispatch;

        this.Stage = this.Stage.bind(this);
        this.Scene = this.Scene.bind(this);
        this.Component = this.Component.bind(this);

        this.setDispatch = this.setDispatch.bind(this);
    }

    _createClass(Builder, [{
        key: 'setDispatch',
        value: function setDispatch(Component, event) {
            var _this = this;

            if ((0, _isString3.default)(event)) event = { type: event };
            return function (e) {
                var getVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (e) {
                    return e.target.value;
                };
                return _this.dispatch({
                    type: event.type,
                    Scene_ID: Component.props.Scene_ID,
                    Component_ID: Component.props.Component_ID,
                    attr: event.attr,
                    value: getVal(e)
                });
            };
        }
    }, {
        key: 'Stage',
        value: function Stage(props) {
            return _react2.default.createElement(_elements.Stage, _extends({ Builder: this }, props));
        }
    }, {
        key: 'Scene',
        value: function Scene(props) {
            return _react2.default.createElement(_elements.Scene, _extends({ Builder: this }, props));
        }
    }, {
        key: 'Component',
        value: function Component(props) {
            return _react2.default.createElement(_elements.Component, _extends({ Builder: this }, props));
        }
    }]);

    return Builder;
}();

exports.default = Builder;