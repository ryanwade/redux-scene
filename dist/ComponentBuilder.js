'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isNull2 = require('lodash/isNull');

var _isNull3 = _interopRequireDefault(_isNull2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _SceneBuilder = require('./SceneBuilder');

var _SceneBuilder2 = _interopRequireDefault(_SceneBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Component Builder Class
 */
var ComponentBuilder = function (_React$Component) {
    _inherits(ComponentBuilder, _React$Component);

    function ComponentBuilder(props) {
        _classCallCheck(this, ComponentBuilder);

        var _this = _possibleConstructorReturn(this, (ComponentBuilder.__proto__ || Object.getPrototypeOf(ComponentBuilder)).call(this, props));

        _this.getData = _this.getData.bind(_this);
        _this.getAttrs = _this.getAttrs.bind(_this);
        _this.getEvents = _this.getEvents.bind(_this);
        _this.getAction = _this.getAction.bind(_this);
        _this.getContent = _this.getContent.bind(_this);
        _this.renderMulti = _this.renderMulti.bind(_this);
        _this.renderSingle = _this.renderSingle.bind(_this);
        return _this;
    }

    _createClass(ComponentBuilder, [{
        key: 'renderSingle',
        value: function renderSingle(component) {
            if (!(0, _isString3.default)(component)) return null;
            var _props = this.props,
                Scene_ID = _props.Scene_ID,
                RComp = _props.RComp,
                resolveStage = _props.resolveStage;

            return _react2.default.createElement(ComponentBuilderM, _extends({ key: component }, { Scene_ID: Scene_ID, Component_ID: component, RComp: RComp, resolveStage: resolveStage }));
        }
    }, {
        key: 'renderMulti',
        value: function renderMulti(components) {
            if (!(0, _isArray3.default)(components)) return this.renderSingle(components);
            return components.map(this.renderSingle);
        }
    }, {
        key: 'getData',
        value: function getData(id) {
            var _props2 = this.props,
                _props2$gData = _props2.gData,
                gData = _props2$gData === undefined ? {} : _props2$gData,
                Scene = _props2.Scene,
                Component = _props2.Component;
            var _Scene$data = Scene.data,
                sData = _Scene$data === undefined ? {} : _Scene$data;
            var _Component$data = Component.data,
                lData = _Component$data === undefined ? {} : _Component$data;

            return lData[id] || sData[id] || gData[id];
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            var Component = this.props.Component;
            var _Component$content = Component.content,
                content = _Component$content === undefined ? null : _Component$content;

            if ((0, _isNull3.default)(content)) return null;
            var _content$fixed = content.fixed,
                fixed = _content$fixed === undefined ? null : _content$fixed,
                _content$data = content.data,
                data = _content$data === undefined ? null : _content$data,
                _content$dataComponen = content.dataComponents,
                dataComponents = _content$dataComponen === undefined ? null : _content$dataComponen,
                _content$components = content.components,
                components = _content$components === undefined ? null : _content$components;

            var ret = [];
            if (!(0, _isNull3.default)(fixed)) ret.push(fixed);
            if (!(0, _isNull3.default)(data)) ret.push.apply(ret, _toConsumableArray(data.map(this.getData)));
            if (!(0, _isNull3.default)(dataComponents)) ret.push(this.renderMulti(dataComponents.map(this.getData)));
            if (!(0, _isNull3.default)(components)) ret.push(this.renderMulti(components));
            return ret;
        }
    }, {
        key: 'getAttrs',
        value: function getAttrs() {
            var _this2 = this;

            var Component = this.props.Component;
            var _Component$attrs = Component.attrs,
                attrs = _Component$attrs === undefined ? null : _Component$attrs;

            if ((0, _isNull3.default)(attrs)) return {};
            var _attrs$fixed = attrs.fixed,
                fixed = _attrs$fixed === undefined ? {} : _attrs$fixed,
                _attrs$data = attrs.data,
                data = _attrs$data === undefined ? {} : _attrs$data,
                _attrs$dataComponents = attrs.dataComponents,
                dataComponents = _attrs$dataComponents === undefined ? {} : _attrs$dataComponents,
                _attrs$components = attrs.components,
                components = _attrs$components === undefined ? {} : _attrs$components;

            var ret = fixed;
            Object.keys(data).map(function (attr) {
                ret[attr] = _this2.getData(data[attr]);
            });
            Object.keys(dataComponents).map(function (attr) {
                ret[attr] = _this2.renderMulti(_this2.getData(dataComponents[attr]));
            });
            Object.keys(components).map(function (attr) {
                ret[attr] = _this2.renderMulti(components[attr]);
            });
            return ret;
        }
    }, {
        key: 'getEvents',
        value: function getEvents() {
            var _this3 = this;

            var _props3 = this.props,
                dispatch = _props3.dispatch,
                Component = _props3.Component;
            var _Component$events = Component.events,
                events = _Component$events === undefined ? {} : _Component$events;

            var ret = {};
            Object.keys(events).map(function (attr) {
                ret[attr] = function (e, getVal) {
                    dispatch(_this3.getAction(events[attr], e, getVal));
                };
            });
            return ret;
        }
    }, {
        key: 'getAction',
        value: function getAction(type, e) {
            var getVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (e) {
                return e.target.value;
            };
            var _props4 = this.props,
                Scene_ID = _props4.Scene_ID,
                Component_ID = _props4.Component_ID;

            return {
                type: type,
                Scene_ID: Scene_ID,
                Component_ID: Component_ID,
                value: getVal(e)
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props5 = this.props,
                Component_ID = _props5.Component_ID,
                Component = _props5.Component,
                RComp = _props5.RComp,
                resolveStage = _props5.resolveStage;

            if (!(0, _isObject3.default)(Component)) {
                return _react2.default.createElement(_SceneBuilder2.default, { Scene_ID: Component_ID, RComp: RComp, resolveStage: resolveStage });
            }
            var ReactComponent = RComp[Component.type] || Component.type;
            return _react2.default.createElement(
                ReactComponent,
                _extends({}, this.getAttrs(), this.getEvents()),
                this.getContent()
            );
        }
    }]);

    return ComponentBuilder;
}(_react2.default.Component);

ComponentBuilder.propTypes = {
    Scene_ID: _react.PropTypes.string.isRequired,
    Component_ID: _react.PropTypes.string.isRequired,
    RComp: _react.PropTypes.object.isRequired,
    resolveStage: _react.PropTypes.func.isRequired,
    //redux
    Scene: _react.PropTypes.object,
    Component: _react.PropTypes.object,
    gData: _react.PropTypes.object,
    dispatch: _react.PropTypes.func
};

function mapStateToProps(state, props) {
    var resolveStage = props.resolveStage,
        Scene_ID = props.Scene_ID,
        Component_ID = props.Component_ID;

    var Stage = resolveStage(state);
    var Scene = Stage.scenes[Scene_ID];
    var Component = Scene.components[Component_ID];
    return {
        Scene: Scene,
        Component: Component,
        gData: Stage.data
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    };
}

var ComponentBuilderM = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ComponentBuilder);

exports.default = ComponentBuilderM;