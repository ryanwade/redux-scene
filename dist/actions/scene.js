'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reset = reset;
exports.setRoot = setRoot;
exports.addComponent = addComponent;
exports.removeComponent = removeComponent;

var _actionTypes = require('../actionTypes');

function reset(scene) {
    return {
        type: _actionTypes.scene.RESET,
        scene: scene
    };
}

function setRoot(scene, value) {
    return {
        type: _actionTypes.scene.SET_ROOT,
        scene: scene,
        value: value
    };
}

function addComponent(scene, component) {
    return {
        type: _actionTypes.scene.ADD_COMPONENT,
        scene: scene,
        component: component
    };
}

function removeComponent(scene, component) {
    return {
        type: _actionTypes.scene.REMOVE_COMPONENT,
        scene: scene,
        component: component
    };
}