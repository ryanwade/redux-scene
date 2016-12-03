import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import TypeParser from '../TypeParser';

import _isUndefined from 'lodash/isUndefined';
import _isString from 'lodash/isString';
import _isObject from 'lodash/isObject';

/*
 * Component Builder Class
 */
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.getContent = this.getContent.bind(this);
        this.getAttrs = this.getAttrs.bind(this);
        this.getEvents = this.getEvents.bind(this);

        this.renderComponent = this.renderComponent.bind(this);

        this.parser = new TypeParser(this.renderComponent);
    }
    /*
     * Get Attributes of the Component to render
     */
    getContent() {
        let { Component: { content = null } } = this.props;
        return this.parser(content);
    }
    getAttrs() {
        let { Component: { attrs = {} } } = this.props;
        let ret = {};
        Object.keys(attrs).map(attr => {
            ret[attr] = this.parser(attrs[attr]);
        });
        return ret;
    }
    getEvents() {
        let { Component: { events = {} } } = this.props;
        let { Builder } = this.props;
        let ret = {};
        Object.keys(events).map(attr => {
            ret[attr] = Builder.setDispatch(this, events[attr]);
        });
        return ret;
    }
    /*
     * Render Component
     */
    renderComponent(id) {
        if(_isUndefined(id)) return null;
        if(!_isString(id)) throw new TypeError("Component identifier must be a string: " + id);
        let { Builder, Scene_ID } = this.props;
        return <Builder.Component key={id} Scene_ID={Scene_ID} Component_ID={id} />;
    }
    /*
     * Render Component
     */
    render() {
        let { Builder, Component_ID, Component } = this.props;
        if(!_isObject(Component)) {
            return <Builder.Scene Scene_ID={Component_ID} />;
        }
        let ReactComponent = Builder.RComp[Component.type] || Component.type;
        return (
            <ReactComponent {...this.getAttrs()} {...this.getEvents()} >
                {this.getContent()}
            </ReactComponent>
        );
    }
}
Component.propTypes = {
    Scene_ID: PropTypes.string.isRequired,
    Component_ID: PropTypes.string.isRequired,
    //Builder
    Builder: PropTypes.object.isRequired,
    //redux
    Scene: PropTypes.object,
    Component: PropTypes.object
};

function mapStateToProps(state, { Builder, Scene_ID, Component_ID }) {
    let Stage = Builder.resolve(state);
    let Scene = Stage.scenes[Scene_ID];
    let Component = Scene.components[Component_ID];
    return {
        Scene,
        Component
    };
}

export default connect(
    mapStateToProps
)(Component);