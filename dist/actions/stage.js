'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reset = reset;
exports.load = load;
exports.setRoot = setRoot;
exports.addScene = addScene;
exports.removeScene = removeScene;

var _actionTypes = require('../actionTypes');

function reset() {
    return {
        type: _actionTypes.stage.RESET
    };
}

function load(stage) {
    return {
        type: _actionTypes.stage.LOAD,
        stage: stage
    };
}

function setRoot(value) {
    return {
        type: _actionTypes.stage.SET_ROOT,
        value: value
    };
}

function addScene(scene) {
    return {
        type: _actionTypes.stage.ADD_SCENE,
        scene: scene
    };
}

function removeScene(scene) {
    return {
        type: _actionTypes.stage.REMOVE_SCENE,
        scene: scene
    };
}