'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = require('./elements');

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
        this.getData = this.getData.bind(this);
    }

    _createClass(Builder, [{
        key: 'setDispatch',
        value: function setDispatch(Component, event) {
            var _this = this;

            return function (e) {
                var getVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (e) {
                    return e.target.value;
                };
                return _this.dispatch({
                    type: event,
                    Scene_ID: Component.props.Scene_ID,
                    Component_ID: Component.props.Component_ID,
                    value: getVal(e)
                });
            };
        }
    }, {
        key: 'Stage',
        value: function Stage(props) {
            props.Builder = this;
            return new _elements.Stage(props);
        }
    }, {
        key: 'Scene',
        value: function Scene(props) {
            props.Builder = this;
            return new _elements.Scene(props);
        }
    }, {
        key: 'Component',
        value: function Component(props) {
            props.Builder = this;
            return new _elements.Component(props);
        }
    }]);

    return Builder;
}();

exports.default = Builder;