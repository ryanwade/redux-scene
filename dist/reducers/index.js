'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = root;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _initialState = require('../constants/initialState');

var initialState = _interopRequireWildcard(_initialState);

var _actionTypes = require('../actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function root() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState.STAGE;
    var action = arguments[1];

    switch (action.type) {
        case actionTypes.stage.RESET:
            return initialState.STAGE;
        case actionTypes.stage.LOAD:
            return _immutable2.default.Map(action.stage);
        case actionTypes.stage.SET_ROOT:
            return state.setIn(["root"], action.value);
        case actionTypes.stage.REMOVE_SCENE:
            return state.removeIn(["scenes", action.scene]);
        case actionTypes.stage.ADD_SCENE:
        case actionTypes.scene.RESET:
            return state.setIn(["scenes", action.scene], initialState.SCENE);
        case actionTypes.scene.SET_ROOT:
            return state.setIn(["scenes", action.scene, "root"], action.value);
        case actionTypes.scene.REMOVE_COMPONENT:
            return state.removeIn(["scenes", action.scene, "components", action.component]);
        case actionTypes.scene.ADD_COMPONENT:
        case actionTypes.component.RESET:
            return state.setIn(["scenes", action.scene, "components", action.component], initialState.COMPONENT);
        case actionTypes.component.SET_TYPE:
            return state.setIn(["scenes", action.scene, "components", action.component, "type"], action.value);
        case actionTypes.component.SET_ATTR:
            return state.setIn(["scenes", action.scene, "components", action.component, "attrs", action.key], action.value);
        case actionTypes.component.REMOVE_ATTR:
            return state.removeIn(["scenes", action.scene, "components", action.component, "attrs", action.key]);
        case actionTypes.component.SET_EVENT:
            return state.setIn(["scenes", action.scene, "components", action.component, "events", action.key], action.value);
        case actionTypes.component.REMOVE_EVENT:
            return state.removeIn(["scenes", action.scene, "components", action.component, "events", action.key]);
        case actionTypes.component.SET_CONTENT:
            return state.setIn(["scenes", action.scene, "components", action.component, "content"], action.value);
        case actionTypes.component.CLEAR_CONTENT:
            return state.setIn(["scenes", action.scene, "components", action.component, "content"], null);
        default:
            return state;
    }
}