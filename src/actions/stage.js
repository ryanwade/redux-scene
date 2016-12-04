import { stage as stageActions } from '../actionTypes';

export function reset() {
    return {
        type: stageActions.RESET
    };
}

export function load(stage) {
    return {
        type: stageActions.LOAD,
        stage
    };
}

export function setRoot(value) {
    return {
        type: stageActions.SET_ROOT,
        value
    };
}

export function addScene(scene) {
    return {
        type: stageActions.ADD_SCENE,
        scene
    };
}

export function removeScene(scene) {
    return {
        type: stageActions.REMOVE_SCENE,
        scene
    };
}