'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('../constants/actions');

exports.default = {
    RESET: _actions.componentPrefix + 'RESET',
    SET_TYPE: _actions.componentPrefix + 'SET_TYPE',
    SET_ATTR: _actions.componentPrefix + 'SET_ATTR',
    REMOVE_ATTR: _actions.componentPrefix + 'REMOVE_ATTR',
    SET_EVENT: _actions.componentPrefix + 'SET_EVENT',
    REMOVE_EVENT: _actions.componentPrefix + 'REMOVE_EVENT',
    SET_CONTENT: _actions.componentPrefix + 'SET_CONTENT',
    CLEAR_CONTENT: _actions.componentPrefix + 'REMOVE_CONTENT'
};