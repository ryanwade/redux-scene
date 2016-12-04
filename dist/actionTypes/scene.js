'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('../constants/actions');

exports.default = {
    RESET: _actions.scenePrefix + 'RESET',
    SET_ROOT: _actions.scenePrefix + 'SET_ROOT',
    ADD_COMPONENT: _actions.scenePrefix + 'ADD_COMPONENT',
    REMOVE_COMPONENT: _actions.scenePrefix + 'REMOVE_COMPONENT'
};