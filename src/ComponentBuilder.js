import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _isNull from 'lodash/isNull';

import SceneBuilder from './SceneBuilder';
/*
 * Component Builder Class
 */
class ComponentBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.getAttrs = this.getAttrs.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.getAction = this.getAction.bind(this);
        this.getContent = this.getContent.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
    }
    getContent(Component, ID) {
        let { gData = {}, Scene, Scene_ID, RComp, resolveStage } = this.props;
        let { data: sData = {} } = Scene;
        let { data: lData = {}, content = null} = Component;
        if(_isNull(content)) return null;
        let { fixed = null, data = null, components = null} = content;
        let ret = [];
        if(!_isNull(fixed)) ret.push(fixed);
        if(!_isNull(data)) ret.push(...data.map(d => lData[d] || sData[d] || gData[d]));
        if(!_isNull(components)) ret.push(<ComponentBuilderC key={"_" + ID} {...{Scene_ID, Component_ID: components, RComp, resolveStage}} />);
        return ret;
    }
    getAttrs(Component) {
        let { gData = {}, Scene, Scene_ID, RComp, resolveStage } = this.props;
        let { data: sData = {} } = Scene;
        let { data: lData = {}, attrs = null } = Component;
        if(_isNull(attrs)) return {};
        let { fixed = {}, data = {}, components = {} } = attrs;
        let ret = fixed;
        Object.keys(data).map(attr => {
            ret[attr] = lData[data[attr]] || sData[data[attr]] || gData[data[attr]];
        });
        Object.keys(components).map(attr => {
            ret[attr] = (<ComponentBuilderC key={components[attr]} {...{Scene_ID, Component_ID: components[attr], RComp, resolveStage}} />);
        });
        return ret;
    }
    getEvents(Component) {
        let { dispatch} = this.props;
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
    renderComponent(component) {
        let { RComp, resolveStage } = this.props;
        let { Component = null, ID } = component;
        if(!_isObject(Component)) {
            return <SceneBuilder {...{Scene_ID: ID, RComp, resolveStage}} />;
        }
        let ReactComponent = RComp[Component.type] || Component.type;
        return (
            <ReactComponent key={ID} {...this.getAttrs(Component)} {...this.getEvents(Component)} >
                {this.getContent(Component, ID)}
            </ReactComponent>
        );
    }
    render() {
        let { Components = null } = this.props;
        if(_isNull(Components)) return null;
        if(Components.length == 1) return this.renderComponent(Components[0]);
        return (<div>
            {Components.map(this.renderComponent)}
        </div>);
    }
}
ComponentBuilder.propTypes = {
    Scene_ID: PropTypes.string.isRequired,
    Component_ID: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    RComp: PropTypes.object.isRequired,
    resolveStage: PropTypes.func.isRequired,
    //redux
    Scene: PropTypes.object,
    Components: PropTypes.array,
    gData: PropTypes.object,
    dispatch: PropTypes.func
};

function mapStateToProps(state, props) {
    let { resolveStage, Scene_ID, Component_ID} = props;
    let Stage = resolveStage(state);
    let Scene = Stage.scenes[Scene_ID];
    Component_ID = _isArray(Component_ID)? Component_ID : [Component_ID];
    let Components = Component_ID.map(ID => {
        return {ID, Component: Scene.components[ID]};
    }) || [];
    return {
        Scene,
        Components,
        gData: Stage.data
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

let ComponentBuilderC = connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentBuilder);

export default ComponentBuilderC;