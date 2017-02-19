'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _TypeParser = require('../TypeParser');

var _TypeParser2 = _interopRequireDefault(_TypeParser);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Component Builder Class
 */
var Component = function (_React$Component) {
    _inherits(Component, _React$Component);

    function Component(props) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

        _this.getContent = _this.getContent.bind(_this);
        _this.getAttrs = _this.getAttrs.bind(_this);
        _this.getEvents = _this.getEvents.bind(_this);

        _this.renderComponent = _this.renderComponent.bind(_this);

        _this.parser = new _TypeParser2.default(_this.renderComponent);
        return _this;
    }
    /*
     * Get Attributes of the Component to render
     */


    _createClass(Component, [{
        key: 'getContent',
        value: function getContent() {
            var Component = this.props.Component;

            return this.parser(Component.get("content"));
        }
    }, {
        key: 'getAttrs',
        value: function getAttrs() {
            var _this2 = this;

            var Component = this.props.Component;

            return Component.get("attrs", _immutable2.default.Map()).map(function (val) {
                return _this2.parser(val);
            }).toJS();
        }
    }, {
        key: 'getEvents',
        value: function getEvents(attrs) {
            var _this3 = this;

            var _props = this.props,
                Component = _props.Component,
                Builder = _props.Builder;

            return Component.get("events", _immutable2.default.Map()).map(function (val) {
                return Builder.setDispatch(_this3, val, attrs);
            }).toJS();
        }
        /*
         * Render Component
         */

    }, {
        key: 'renderComponent',
        value: function renderComponent(id) {
            if ((0, _isUndefined3.default)(id)) return null;
            if (!(0, _isString3.default)(id)) throw new TypeError("Component identifier must be a string: " + id);
            var _props2 = this.props,
                Builder = _props2.Builder,
                Scene_ID = _props2.Scene_ID;

            return _react2.default.createElement(Builder.Component, { key: id, Scene_ID: Scene_ID, Component_ID: id });
        }
        /*
         * Render Component
         */

    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                Builder = _props3.Builder,
                Component_ID = _props3.Component_ID,
                Component = _props3.Component;

            if (!(0, _isObject3.default)(Component)) {
                return _react2.default.createElement(Builder.Scene, { Scene_ID: Component_ID });
            }
            var type = Component.get("type");
            var ReactComponent = Builder.RComp[type] || type;
            var attrs = this.getAttrs();
            return _react2.default.createElement(
                ReactComponent,
                _extends({}, attrs, this.getEvents(attrs)),
                this.getContent()
            );
        }
    }]);

    return Component;
}(_react2.default.Component);

Component.propTypes = {
    Scene_ID: _react.PropTypes.string.isRequired,
    Component_ID: _react.PropTypes.string.isRequired,
    //Builder
    Builder: _react.PropTypes.object.isRequired,
    //redux
    Scene: _react.PropTypes.object,
    Component: _react.PropTypes.object
};

function mapStateToProps(state, _ref) {
    var Builder = _ref.Builder,
        Scene_ID = _ref.Scene_ID,
        Component_ID = _ref.Component_ID;

    var Stage = Builder.resolve(state);
    var Scene = Stage.getIn(["scenes", Scene_ID], _immutable2.default.Map());
    var Component = Scene.getIn(["components", Component_ID]);
    return {
        Scene: Scene,
        Component: Component
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Component);