import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _isObject from 'lodash/isObject';

import ComponentBuilder from './ComponentBuilder';

/*
 * Scene Builder Class
 */
class SceneBuilder extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { Scene, Scene_ID, RComp, resolveStage} = this.props;
        return (!_isObject(Scene))? null : (
            <ComponentBuilder {...{Scene_ID, Component_ID: Scene.root, RComp, resolveStage}} />
        );
    }
}
SceneBuilder.propTypes = {
    Scene_ID: PropTypes.string.isRequired,
    RComp: PropTypes.obj.isRequired,
    resolveStage: PropTypes.func.isRequired,
    //redux
    Scene: PropTypes.obj.isRequired
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