import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _isObject from 'lodash/isObject';
import _isNull from 'lodash/isNull';

import SceneBuilder from './SceneBuilder';
import MultiComponentBuilder from './MultiComponentBuilder';
/*
 * Component Builder Class
 */
class ComponentBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.getAttrs = this.getAttrs.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.getAction = this.getAction.bind(this);
        this.getContent = this.getContent.bind(this);
    }
    getData(id) {
        let { gData = {}, Scene, Component} = this.props;
        let { data: sData = {} } = Scene;
        let { data: lData = {} } = Component;
        return lData[id] || sData[id] || gData[id];
    }
    getContent() {
        let { Scene_ID, Component, Component_ID, RComp, resolveStage } = this.props;
        let { content = null} = Component;
        if(_isNull(content)) return null;
        let { fixed = null, data = null, components = null} = content;
        let ret = [];
        if(!_isNull(fixed)) ret.push(fixed);
        if(!_isNull(data)) ret.push(...data.map(this.getData));
        if(!_isNull(components)) ret.push(<MultiComponentBuilder key={"_" + Component_ID} {...{Scene_ID, Component_ID: components, RComp, resolveStage}} />);
        return ret;
    }
    getAttrs() {
        let { Scene_ID, Component, RComp, resolveStage } = this.props;
        let { attrs = null } = Component;
        if(_isNull(attrs)) return {};
        let { fixed = {}, data = {}, components = {} } = attrs;
        let ret = fixed;
        Object.keys(data).map(attr => {
            ret[attr] = this.getData(data[attr]);
        });
        Object.keys(components).map(attr => {
            ret[attr] = (<MultiComponentBuilder key={components[attr]} {...{Scene_ID, Component_ID: components[attr], RComp, resolveStage}} />);
        });
        return ret;
    }
    getEvents() {
        let { dispatch, Component } = this.props;
        let { events = {} } = Component;
        let ret = {
            onChange: (e, getVal) => {
                dispatch(this.getAction("LOCAL_CHANGE", e, getVal));
            }
        };
        Object.keys(events).map(attr => {
            ret[attr] = (e, getVal) => {
                dispatch(this.getAction(events[attr], e, getVal));
            };
        });
        return ret;
    }
    getAction(type, e, getVal = (e) => e.target.value) {
        let { Scene_ID, Component_ID } = this.props;
        return {
            type,
            Scene_ID,
            Component_ID,
            value: getVal(e)
        };
    }
    render() {
        let { Component_ID, Component, RComp, resolveStage } = this.props;
        if(!_isObject(Component)) {
            console.log("Scene:", Component_ID);
            return <SceneBuilder key={Component_ID} {...{Scene_ID: Component_ID, RComp, resolveStage}} />;
        }
        let ReactComponent = RComp[Component.type] || Component.type;
        console.log("Component:", Component_ID);
        return (
            <ReactComponent key={Component_ID} {...this.getAttrs()} {...this.getEvents()} >
                {this.getContent()}
            </ReactComponent>
        );
    }
}
ComponentBuilder.propTypes = {
    Scene_ID: PropTypes.string.isRequired,
    Component_ID: PropTypes.string.isRequired,
    RComp: PropTypes.object.isRequired,
    resolveStage: PropTypes.func.isRequired,
    //redux
    Scene: PropTypes.object,
    Component: PropTypes.object,
    gData: PropTypes.object,
    dispatch: PropTypes.func
};

function mapStateToProps(state, props) {
    let { resolveStage, Scene_ID, Component_ID} = props;
    let Stage = resolveStage(state);
    let Scene = Stage.scenes[Scene_ID];
    let Component = Scene.components[Component_ID];
    return {
        Scene,
        Component,
        gData: Stage.data
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentBuilder);