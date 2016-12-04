import Immutable from 'immutable';
export const STAGE = Immutable.Map({
    root: null,
    scenes: Immutable.Map({})
});

export const SCENE = Immutable.Map({
    root: null,
    components: Immutable.Map({})
});

export const COMPONENT = Immutable.Map({
    type: null,
    attrs: Immutable.Map({}),
    events: Immutable.Map({}),
    content: null
});