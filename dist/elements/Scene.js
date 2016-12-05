'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Scene Builder Class
 */
var Scene = function (_React$Component) {
    _inherits(Scene, _React$Component);

    function Scene(props) {
        _classCallCheck(this, Scene);

        var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, props));

        _this.renderComponent = _this.renderComponent.bind(_this);
        return _this;
    }

    _createClass(Scene, [{
        key: 'renderComponent',
        value: function renderComponent(component) {
            var _props = this.props,
                Scene_ID = _props.Scene_ID,
                Builder = _props.Builder;

            return _react2.default.createElement(Builder.Component, { key: component, Scene_ID: Scene_ID, Component_ID: component });
        }
    }, {
        key: 'render',
        value: function render() {
            var Scene = this.props.Scene;

            if (Scene === null) return null;
            var root = Scene.get("root");
            if ((0, _isString3.default)(root)) return this.renderComponent(root);
            if ((0, _isArray3.default)(root)) return _react2.default.createElement(
                'div',
                null,
                root.map(this.renderComponent)
            );
            return null;
        }
    }]);

    return Scene;
}(_react2.default.Component);

Scene.propTypes = {
    Scene_ID: _react.PropTypes.string.isRequired,
    //Builder
    Builder: _react.PropTypes.object.isRequired,
    //redux
    Scene: _react.PropTypes.object
};

function mapStateToProps(state, _ref) {
    var Builder = _ref.Builder,
        Scene_ID = _ref.Scene_ID;

    var Stage = Builder.resolve(state);
    var Scene = Stage.getIn(["scenes", Scene_ID], null);
    return {
        Scene: Scene
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Scene);