'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isNull2 = require('lodash/isNull');

var _isNull3 = _interopRequireDefault(_isNull2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _ComponentBuilder = require('./ComponentBuilder');

var _ComponentBuilder2 = _interopRequireDefault(_ComponentBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiComponentBuilder = function (_React$Component) {
    _inherits(MultiComponentBuilder, _React$Component);

    function MultiComponentBuilder(props) {
        _classCallCheck(this, MultiComponentBuilder);

        var _this = _possibleConstructorReturn(this, (MultiComponentBuilder.__proto__ || Object.getPrototypeOf(MultiComponentBuilder)).call(this, props));

        _this.renderComponent = _this.renderComponent.bind(_this);
        return _this;
    }

    _createClass(MultiComponentBuilder, [{
        key: 'renderComponent',
        value: function renderComponent(Component_ID) {
            var _props = this.props,
                Scene_ID = _props.Scene_ID,
                RComp = _props.RComp,
                resolveStage = _props.resolveStage;

            return _react2.default.createElement(_ComponentBuilder2.default, { Scene_ID: Scene_ID, Component_ID: Component_ID, RComp: RComp, resolveStage: resolveStage });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$Component_ID = this.props.Component_ID,
                Component_ID = _props$Component_ID === undefined ? null : _props$Component_ID;

            console.log("Builder:", Component_ID);
            if ((0, _isNull3.default)(Component_ID)) return null;
            if ((0, _isString3.default)(Component_ID)) return this.renderComponent(Component_ID);
            if (Component_ID.length == 1) return this.renderComponent(Component_ID[0]);
            return _react2.default.createElement(
                'div',
                null,
                Component_ID.map(this.renderComponent)
            );
        }
    }]);

    return MultiComponentBuilder;
}(_react2.default.Component);

MultiComponentBuilder.propTypes = {
    Scene_ID: _react.PropTypes.string.isRequired,
    Component_ID: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]).isRequired,
    RComp: _react.PropTypes.object.isRequired,
    resolveStage: _react.PropTypes.func.isRequired
};

exports.default = MultiComponentBuilder;