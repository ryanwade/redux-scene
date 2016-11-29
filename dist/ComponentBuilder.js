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

        _this.getAttrs = _this.getAttrs.bind(_this);
        _this.getEvents = _this.getEvents.bind(_this);
        _this.getAction = _this.getAction.bind(_this);
        return _this;
    }

    _createClass(ComponentBuilder, [{
        key: 'getContent',
        value: function getContent(Component, ID) {
            var _props = this.props,
                gData = _props.gData,
                Scene = _props.Scene,
                Scene_ID = _props.Scene_ID,
                RComp = _props.RComp,
                resolveStage = _props.resolveStage;
            var sData = Scene.sData;
            var lData = Component.lData,
                content = Component.content;
            var fixed = content.fixed,
                _content$data = content.data,
                data = _content$data === undefined ? [] : _content$data,
                _content$components = content.components,
                components = _content$components === undefined ? [] : _content$components;

            return [fixed].concat(_toConsumableArray(data.map(function (d) {
                return lData[d] || sData[d] || gData[d];
            })), [_react2.default.createElement(ComponentBuilder, _extends({ key: ID }, { Scene_ID: Scene_ID, Component_ID: components, RComp: RComp, resolveStage: resolveStage }))]);
        }
    }, {
        key: 'getAttrs',
        value: function getAttrs(Component) {
            var _props2 = this.props,
                gData = _props2.gData,
                Scene = _props2.Scene,
                Scene_ID = _props2.Scene_ID,
                RComp = _props2.RComp,
                resolveStage = _props2.resolveStage;
            var sData = Scene.sData;
            var lData = Component.lData,
                attrs = Component.attrs;
            var _attrs$fixed = attrs.fixed,
                fixed = _attrs$fixed === undefined ? {} : _attrs$fixed,
                _attrs$data = attrs.data,
                data = _attrs$data === undefined ? {} : _attrs$data,
                _attrs$components = attrs.components,
                components = _attrs$components === undefined ? {} : _attrs$components;

            var ret = fixed;
            Object.keys(data).map(function (attr) {
                ret[attr] = lData[data[attr]] || sData[data[attr]] || gData[data[attr]];
            });
            Object.keys(components).map(function (attr) {
                ret[attr] = _react2.default.createElement(ComponentBuilder, { Scene_ID: Scene_ID, Component_ID: components[attr], RComp: RComp, resolveStage: resolveStage });
            });
            return ret;
        }
    }, {
        key: 'getEvents',
        value: function getEvents(Component) {
            var _this2 = this;

            var dispatch = this.props.dispatch;
            var events = Component.events;

            var ret = {
                onChange: function onChange(e, getVal) {
                    dispatch(_this2.getAction("LOCAL_CHANGE", e, getVal));
                }
            };
            Object.keys(events).map(function (attr) {
                ret[attr] = function (e, getVal) {
                    dispatch(_this2.getAction(events[attr], e, getVal));
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
            var _props3 = this.props,
                Scene_ID = _props3.Scene_ID,
                Component_ID = _props3.Component_ID;

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
            var _this3 = this;

            var _props4 = this.props,
                Components = _props4.Components,
                RComp = _props4.RComp,
                resolveStage = _props4.resolveStage;

            return Components.map(function (component) {
                var _component$Component = component.Component,
                    Component = _component$Component === undefined ? null : _component$Component,
                    ID = component.ID;

                if (!(0, _isObject3.default)(Component)) {
                    return _react2.default.createElement(_SceneBuilder2.default, { Scene_ID: ID, RComp: RComp, resolveStage: resolveStage });
                }
                var ReactComponent = RComp[Component.type] || Component.type;
                return _react2.default.createElement(
                    ReactComponent,
                    _extends({ key: ID }, _this3.getAttrs(Component), _this3.getEvents(Component)),
                    _this3.getContent(Component, ID)
                );
            });
        }
    }]);

    return ComponentBuilder;
}(_react2.default.Component);

ComponentBuilder.propTypes = {
    Scene_ID: _react.PropTypes.string.isRequired,
    Component_ID: _react.PropTypes.oneOf([_react.PropTypes.string, _react.PropTypes.array]).isRequired,
    RComp: _react.PropTypes.obj.isRequired,
    resolveStage: _react.PropTypes.func.isRequired,
    //redux
    Scene: _react.PropTypes.obj.isRequired,
    Components: _react.PropTypes.array.isRequired,
    gData: _react.PropTypes.obj,
    sData: _react.PropTypes.obj,
    dispatch: _react.PropTypes.obj
};

function mapStateToProps(state, props) {
    var resolveUI = props.resolveUI,
        Scene_ID = props.Scene_ID,
        Component_ID = props.Component_ID;

    var Stage = resolveUI(state);
    var Scene = Stage.scenes[Scene_ID];
    Component_ID = (0, _isArray3.default)(Component_ID) ? Component_ID : [Component_ID];
    var Components = Component_ID.map(function (id) {
        return { id: id, component: Scene.components[id] };
    });
    return {
        Scene: Scene,
        Components: Components,
        gData: Stage.data
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ComponentBuilder);