import { component as componentActions } from '../actionTypes';

export function reset(scene, component) {
    return {
        type: componentActions.RESET,
        scene,
        component
    };
}

export function setType(scene, component, value) {
    return {
        type: componentActions.SET_TYPE,
        scene,
        component,
        value
    };
}

export function setAttr(scene, component, key, value) {
    return {
        type: componentActions.SET_ATTR,
        scene,
        component,
        key,
        value
    };
}

export function removeAttr(scene, component, key) {
    return {
        type: componentActions.REMOVE_ATTR,
        scene,
        component,
        key
    };
}

export function setEvent(scene, component, key, value) {
    return {
        type: componentActions.SET_EVENT,
        scene,
        component,
        key,
        value
    };
}

export function removeEvent(scene, component, key) {
    return {
        type: componentActions.REMOVE_EVENT,
        scene,
        component,
        key
    };
}

export function setContent(scene, component, value) {
    return {
        type: componentActions.SET_CONTENT,
        scene,
        component,
        value
    };
}

export function clearContent(scene, component) {
    return {
        type: componentActions.CLEAR_CONTENT,
        scene,
        component
    };
}