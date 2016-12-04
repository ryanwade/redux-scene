import { scene as sceneActions } from '../actionTypes';

export function reset(scene) {
    return {
        type: sceneActions.RESET,
        scene
    };
}

export function setRoot(scene, value) {
    return {
        type: sceneActions.SET_ROOT,
        scene,
        value
    };
}

export function addComponent(scene, component) {
    return {
        type: sceneActions.ADD_COMPONENT,
        scene,
        component
    };
}

export function removeComponent(scene, component) {
    return {
        type: sceneActions.REMOVE_COMPONENT,
        scene,
        component
    };
}