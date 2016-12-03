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
            var _props$Component$cont = this.props.Component.content,
                content = _props$Component$cont === undefined ? null : _props$Component$cont;

            return this.parser(content);
        }
    }, {
        key: 'getAttrs',
        value: function getAttrs() {
            var _this2 = this;

            var _props$Component$attr = this.props.Component.attrs,
                attrs = _props$Component$attr === undefined ? {} : _props$Component$attr;

            var ret = {};
            Object.keys(attrs).map(function (attr) {
                ret[attr] = _this2.parser(attrs[attr]);
            });
            return ret;
        }
    }, {
        key: 'getEvents',
        value: function getEvents() {
            var _this3 = this;

            var _props$Component$even = this.props.Component.events,
                events = _props$Component$even === undefined ? {} : _props$Component$even;
            var Builder = this.props.Builder;

            var ret = {};
            Object.keys(events).map(function (attr) {
                ret[attr] = Builder.setDispatch(_this3, events[attr]);
            });
            return ret;
        }
        /*
         * Render Component
         */

    }, {
        key: 'renderComponent',
        value: function renderComponent(id) {
            if ((0, _isUndefined3.default)(id)) return null;
            if (!(0, _isString3.default)(id)) throw new TypeError("Component identifier must be a string: " + id);
            var _props = this.props,
                Builder = _props.Builder,
                Scene_ID = _props.Scene_ID;

            return _react2.default.createElement(Builder.Component, { key: id, Scene_ID: Scene_ID, Component_ID: id });
        }
        /*
         * Render Component
         */

    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                Builder = _props2.Builder,
                Component_ID = _props2.Component_ID,
                Component = _props2.Component;

            if (!(0, _isObject3.default)(Component)) {
                return _react2.default.createElement(Builder.Scene, { Scene_ID: Component_ID });
            }
            var ReactComponent = Builder.RComp[Component.type] || Component.type;
            return _react2.default.createElement(
                ReactComponent,
                _extends({}, this.getAttrs(), this.getEvents()),
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
    var Scene = Stage.scenes[Scene_ID];
    var Component = Scene.components[Component_ID];
    return {
        Scene: Scene,
        Component: Component
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Component);