import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';

import ComponentBuilder from './ComponentBuilder';

/*
 * Scene Builder Class
 */
class SceneBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.renderComponent = this.renderComponent.bind(this);
    }
    renderComponent(component) {
        let { Scene_ID, RComp, resolveStage } = this.props;
        return <ComponentBuilder key={component} {...{Scene_ID, Component_ID: component, RComp, resolveStage}} />;
    }
    render() {
        let { Scene = {} } = this.props;
        let { root = null } = Scene;
        if (_isString(root)) return this.renderComponent(Scene.root);
        if (_isArray(root)) return (
            <div>
                {Scene.root.map(this.renderComponent)}
            </div>
        );
        return null;
    }
}
SceneBuilder.propTypes = {
    Scene_ID: PropTypes.string.isRequired,
    RComp: PropTypes.object.isRequired,
    resolveStage: PropTypes.func.isRequired,
    //redux
    Scene: PropTypes.object
};

function mapStateToProps(state, props) {
    let { resolveStage, Scene_ID} = props;
    let Stage = resolveStage(state);
    let Scene = Stage.scenes[Scene_ID];
    return {
        Scene
    };
}

export default connect(
    mapStateToProps
)(SceneBuilder);