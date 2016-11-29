'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _SceneBuilder = require('./SceneBuilder');

var _SceneBuilder2 = _interopRequireDefault(_SceneBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Stage Builder Class
 */
var StageBuilder = function (_React$Component) {
    _inherits(StageBuilder, _React$Component);

    function StageBuilder(props) {
        _classCallCheck(this, StageBuilder);

        return _possibleConstructorReturn(this, (StageBuilder.__proto__ || Object.getPrototypeOf(StageBuilder)).call(this, props));
    }

    _createClass(StageBuilder, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                Stage = _props.Stage,
                RComp = _props.RComp,
                resolveStage = _props.resolveStage;

            return _react2.default.createElement(_SceneBuilder2.default, { Scene_ID: Stage.root, RComp: RComp, resolveStage: resolveStage });
        }
    }]);

    return StageBuilder;
}(_react2.default.Component);

StageBuilder.propTypes = {
    RComp: _react.PropTypes.obj.isRequired,
    resolveStage: _react.PropTypes.func.isRequired,
    //redux
    Stage: _react.PropTypes.obj.isRequired
};

function mapStateToProps(state, props) {
    var resolveStage = props.resolveStage;

    var Stage = resolveStage(state);
    return {
        Stage: Stage
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(StageBuilder);