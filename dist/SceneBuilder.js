'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

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

        return _possibleConstructorReturn(this, (SceneBuilder.__proto__ || Object.getPrototypeOf(SceneBuilder)).call(this, props));
    }

    _createClass(SceneBuilder, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                Scene = _props.Scene,
                Scene_ID = _props.Scene_ID,
                RComp = _props.RComp,
                resolveStage = _props.resolveStage;

            return !(0, _isObject3.default)(Scene) || (0, _isUndefined3.default)(Scene.root) ? null : _react2.default.createElement(_ComponentBuilder2.default, { Scene_ID: Scene_ID, Component_ID: Scene.root, RComp: RComp, resolveStage: resolveStage });
        }
    }]);

    return SceneBuilder;
}(_react2.default.Component);

SceneBuilder.propTypes = {
    Scene_ID: _react.PropTypes.string.isRequired,
    RComp: _react.PropTypes.object.isRequired,
    resolveStage: _react.PropTypes.func.isRequired,
    //redux
    Scene: _react.PropTypes.object.isRequired
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