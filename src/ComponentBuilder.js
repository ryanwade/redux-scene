import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';

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
    }
    getContent(Component, ID) {
        let { gData, Scene, Scene_ID, RComp, resolveStage } = this.props;
        let { sData } = Scene;
        let { lData, content } = Component;
        let { fixed, data = [], components = [] } = content;
        return [
            fixed,
            ...data.map(d => lData[d] || sData[d] || gData[d]),
            (<ComponentBuilder key={ID} {...{Scene_ID, Component_ID: components, RComp, resolveStage}} />)
        ];
    }
    getAttrs(Component) {
        let { gData, Scene, Scene_ID, RComp, resolveStage } = this.props;
        let { sData } = Scene;
        let { lData, attrs } = Component;
        let { fixed = {}, data = {}, components = {} } = attrs;
        let ret = fixed;
        Object.keys(data).map(attr => {
            ret[attr] = lData[data[attr]] || sData[data[attr]] || gData[data[attr]];
        });
        Object.keys(components).map(attr => {
            ret[attr] = (<ComponentBuilder {...{Scene_ID, Component_ID: components[attr], RComp, resolveStage}} />);
        });
        return ret;
    }
    getEvents(Component) {
        let { dispatch } = this.props;
        let { events } = Component;
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
        let { Components, RComp, resolveStage } = this.props;
        return Components.map(component => {
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
        });
    }
}
ComponentBuilder.propTypes = {
    Scene_ID: PropTypes.string.isRequired,
    Component_ID: PropTypes.oneOf([PropTypes.string, PropTypes.array]).isRequired,
    RComp: PropTypes.object.isRequired,
    resolveStage: PropTypes.func.isRequired,
    //redux
    Scene: PropTypes.object.isRequired,
    Components: PropTypes.array.isRequired,
    gData: PropTypes.object,
    sData: PropTypes.object,
    dispatch: PropTypes.object
};

function mapStateToProps(state, props) {
    let { resolveUI, Scene_ID, Component_ID} = props;
    let Stage = resolveUI(state);
    let Scene = Stage.scenes[Scene_ID];
    Component_ID = _isArray(Component_ID)? Component_ID : [Component_ID];
    let Components = Component_ID.map(id => {
        return {id, component: Scene.components[id]};
    });
    return {
        Scene,
        Components,
        gData: Stage.data,
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