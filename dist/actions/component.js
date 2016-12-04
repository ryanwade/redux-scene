'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reset = reset;
exports.setType = setType;
exports.setAttr = setAttr;
exports.removeAttr = removeAttr;
exports.setEvent = setEvent;
exports.removeEvent = removeEvent;
exports.setContent = setContent;
exports.clearContent = clearContent;

var _actionTypes = require('../actionTypes');

function reset(scene, component) {
    return {
        type: _actionTypes.component.RESET,
        scene: scene,
        component: component
    };
}

function setType(scene, component, value) {
    return {
        type: _actionTypes.component.SET_TYPE,
        scene: scene,
        component: component,
        value: value
    };
}

function setAttr(scene, component, key, value) {
    return {
        type: _actionTypes.component.SET_ATTR,
        scene: scene,
        component: component,
        key: key,
        value: value
    };
}

function removeAttr(scene, component, key) {
    return {
        type: _actionTypes.component.REMOVE_ATTR,
        scene: scene,
        component: component,
        key: key
    };
}

function setEvent(scene, component, key, value) {
    return {
        type: _actionTypes.component.SET_EVENT,
        scene: scene,
        component: component,
        key: key,
        value: value
    };
}

function removeEvent(scene, component, key) {
    return {
        type: _actionTypes.component.REMOVE_EVENT,
        scene: scene,
        component: component,
        key: key
    };
}

function setContent(scene, component, value) {
    return {
        type: _actionTypes.component.SET_CONTENT,
        scene: scene,
        component: component,
        value: value
    };
}

function clearContent(scene, component) {
    return {
        type: _actionTypes.component.CLEAR_CONTENT,
        scene: scene,
        component: component
    };
}