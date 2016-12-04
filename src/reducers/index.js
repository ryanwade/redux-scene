import Immutable from 'immutable';

import * as initialState from '../constants/initialState';
import * as actionTypes from '../actionTypes';

export default function root(state = initialState.STAGE, action) {
    switch(action.type) {
        case actionTypes.stage.RESET:
            return initialState.STAGE;
        case actionTypes.stage.LOAD:
            return Immutable.Map(action.stage);
        case actionTypes.stage.SET_ROOT:
            return state.setIn(     ["root"], action.value);
        case actionTypes.stage.REMOVE_SCENE:
            return state.removeIn(  ["scenes", action.scene]);
        case actionTypes.stage.ADD_SCENE:
        case actionTypes.scene.RESET:
            return state.setIn(     ["scenes", action.scene], initialState.SCENE);
        case actionTypes.scene.SET_ROOT:
            return state.setIn(     ["scenes", action.scene, "root"], action.value);
        case actionTypes.scene.REMOVE_COMPONENT:
            return state.removeIn(  ["scenes", action.scene, "components", action.component]);
        case actionTypes.scene.ADD_COMPONENT:
        case actionTypes.component.RESET:
            return state.setIn(     ["scenes", action.scene, "components", action.component], initialState.COMPONENT);
        case actionTypes.component.SET_TYPE:
            return state.setIn(     ["scenes", action.scene, "components", action.component, "type"], action.value);
        case actionTypes.component.SET_ATTR:
            return state.setIn(     ["scenes", action.scene, "components", action.component, "attrs" , action.key], action.value);
        case actionTypes.component.REMOVE_ATTR:
            return state.removeIn(  ["scenes", action.scene, "components", action.component, "attrs" , action.key]);
        case actionTypes.component.SET_EVENT:
            return state.setIn(     ["scenes", action.scene, "components", action.component, "events", action.key], action.value);
        case actionTypes.component.REMOVE_EVENT:
            return state.removeIn(  ["scenes", action.scene, "components", action.component, "events", action.key]);
        case actionTypes.component.SET_CONTENT:
            return state.setIn(     ["scenes", action.scene, "components", action.component, "content"], action.value);
        case actionTypes.component.CLEAR_CONTENT:
            return state.setIn(     ["scenes", action.scene, "components", action.component, "content"], null);
        default:
            return state;
    }
}