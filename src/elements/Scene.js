import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';

/*
 * Scene Builder Class
 */
class Scene extends React.Component {
    constructor(props) {
        super(props);

        this.renderComponent = this.renderComponent.bind(this);
    }
    renderComponent(component) {
        let { Scene_ID, Builder } = this.props;
        return <Builder.Component key={component} Scene_ID={Scene_ID} Component_ID={component} />;
    }
    render() {
        let { Scene } = this.props;
        if(Scene === null) return null;
        let root = Scene.get("root");
        if (_isString(root)) return this.renderComponent(root);
        if (_isArray(root)) return (
            <div>
                {root.map(this.renderComponent)}
            </div>
        );
        return null;
    }
}
Scene.propTypes = {
    Scene_ID: PropTypes.string.isRequired,
    //Builder
    Builder: PropTypes.object.isRequired,
    //redux
    Scene: PropTypes.object
};

function mapStateToProps(state, {Builder, Scene_ID}) {
    let Stage = Builder.resolve(state);
    let Scene = Stage.getIn(["scenes", Scene_ID], null);
    return {
        Scene
    };
}

export default connect(
    mapStateToProps
)(Scene);