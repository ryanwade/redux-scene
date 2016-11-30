'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _ComponentBuilder = require('./ComponentBuilder');

var _ComponentBuilder2 = _interopRequireDefault(_ComponentBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Scene Builder Class
 */
var SceneBuilder = function (_React$Component) {
    _inherits(SceneBuilder, _React$Component);

    function SceneBuilder(props) {
        _classCallCheck(this, SceneBuilder);

        var _this = _possibleConstructorReturn(this, (SceneBuilder.__proto__ || Object.getPrototypeOf(SceneBuilder)).call(this, props));

        _this.renderComponent = _this.renderComponent.bind(_this);
        return _this;
    }

    _createClass(SceneBuilder, [{
        key: 'renderComponent',
        value: function renderComponent(component) {
            var _props = this.props,
                Scene_ID = _props.Scene_ID,
                RComp = _props.RComp,
                resolveStage = _props.resolveStage;

            return _react2.default.createElement(_ComponentBuilder2.default, _extends({ key: component }, { Scene_ID: Scene_ID, Component_ID: component, RComp: RComp, resolveStage: resolveStage }));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$Scene = this.props.Scene,
                Scene = _props$Scene === undefined ? {} : _props$Scene;
            var _Scene$root = Scene.root,
                root = _Scene$root === undefined ? null : _Scene$root;

            if ((0, _isString3.default)(root)) return this.renderComponent(Scene.root);
            if ((0, _isArray3.default)(root)) return _react2.default.createElement(
                'div',
                null,
                Scene.root.map(this.renderComponent)
            );
            return null;
        }
    }]);

    return SceneBuilder;
}(_react2.default.Component);

SceneBuilder.propTypes = {
    Scene_ID: _react.PropTypes.string.isRequired,
    RComp: _react.PropTypes.object.isRequired,
    resolveStage: _react.PropTypes.func.isRequired,
    //redux
    Scene: _react.PropTypes.object
};

function mapStateToProps(state, props) {
    var resolveStage = props.resolveStage,
        Scene_ID = props.Scene_ID;

    var Stage = resolveStage(state);
    var Scene = Stage.scenes[Scene_ID];
    return {
        Scene: Scene
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SceneBuilder);