import React from 'react';

import _isString from 'lodash/isString';

import { Stage, Scene, Component } from './elements';

class Builder {
    constructor(RComp, resolve, dispatch) {
        this.RComp = RComp;
        this.resolve = resolve;
        this.dispatch = dispatch;

        this.Stage = this.Stage.bind(this);
        this.Scene = this.Scene.bind(this);
        this.Component = this.Component.bind(this);

        this.setDispatch = this.setDispatch.bind(this);
    }

    setDispatch(Component, event, attrs) {
        if(_isString(event)) event = { type: event };
        return (e, getVal = (e) => {
            if(event.attr == 'value') {
                return e.target.value;
            } else {
                return attrs[event.attr];
            }
        }) => this.dispatch({
            type: event.type,
            scene: Component.props.Scene_ID,
            component: Component.props.Component_ID,
            key: event.attr,
            value: getVal(e)
        });
    }
    Stage(props) {
        return <Stage Builder={this} {...props} />;
    }
    Scene(props) {
        return <Scene Builder={this} {...props} />;
    }
    Component(props) {
        return <Component Builder={this} {...props} />;
    }
}

export default Builder;