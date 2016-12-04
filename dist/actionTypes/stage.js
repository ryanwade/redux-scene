"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require("../constants/actions");

exports.default = {
    RESET: _actions.stagePrefix + "RESET",
    LOAD: _actions.stagePrefix + "LOAD",
    SET_ROOT: _actions.stagePrefix + "SET_ROOT",
    ADD_SCENE: _actions.stagePrefix + "ADD_SCENE",
    REMOVE_SCENE: _actions.stagePrefix + "REMOVE_SCENE"
};