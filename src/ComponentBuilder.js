import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _isObject from 'lodash/isObject';
//import _isNull from 'lodash/isNull';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';

import SceneBuilder from './SceneBuilder';
import TypeParser from './TypeParser';
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
        this.renderMulti = this.renderMulti.bind(this);
        this.renderSingle = this.renderSingle.bind(this);

        this.TypeParser = (new TypeParser(this)).typeParser;
    }
    renderSingle(component) {
        if(!_isString(component)) return null;
        let { Scene_ID, RComp, resolveStage } = this.props;
        return <ComponentBuilderM key={component} {...{Scene_ID, Component_ID: component, RComp, resolveStage}} />;
    }
    renderMulti(components) {
        if(!_isArray(components)) return this.renderSingle(components);
        return components.map(this.renderSingle);
    }
    getData(id) {
        let { gData = {}, Scene, Component} = this.props;
        let { data: sData = {} } = Scene;
        let { data: lData = {} } = Component;
        return lData[id] || sData[id] || gData[id];
    }
    getContent() {
        let { Component} = this.props;
        let { content = null} = Component;
        return this.TypeParser(content);
        /*if(_isNull(content)) return null;
        let { fixed = null, data = null, dataComponents = null, components = null} = content;
        let ret = [];
        if(!_isNull(fixed)) ret.push(fixed);
        if(!_isNull(data)) ret.push(...data.map(this.getData));
        if(!_isNull(dataComponents)) ret.push(this.renderMulti(dataComponents.map(this.getData)));
        if(!_isNull(components)) ret.push(this.renderMulti(components));
        return ret;*/
    }
    getAttrs() {
        let { Component } = this.props;
        let { attrs = {} } = Component;
        let ret = {};
        Object.keys(attrs).map(attr => {
            ret[attr] = this.TypeParser(attrs[attr]);
        });
        return ret;
        /*if(_isNull(attrs)) return {};
        let { fixed = {}, data = {}, dataComponents = {}, components = {} } = attrs;
        let ret = fixed;
        Object.keys(data).map(attr => {
            ret[attr] = this.getData(data[attr]);
        });
        Object.keys(dataComponents).map(attr => {
            ret[attr] = this.renderMulti(this.getData(dataComponents[attr]));
        });
        Object.keys(components).map(attr => {
            ret[attr] = this.renderMulti(components[attr]);
        });
        return ret;*/
    }
    getEvents() {
        let { dispatch, Component } = this.props;
        let { events = {} } = Component;
        let ret = {};
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
            return <SceneBuilder {...{Scene_ID: Component_ID, RComp, resolveStage}} />;
        }
        let ReactComponent = RComp[Component.type] || Component.type;
        return (
            <ReactComponent {...this.getAttrs()} {...this.getEvents()} >
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

let ComponentBuilderM = connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentBuilder);

export default ComponentBuilderM;