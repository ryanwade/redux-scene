import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SceneBuilder from './SceneBuilder';

/*
 * Stage Builder Class
 */
class StageBuilder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { Stage, RComp, resolveStage } = this.props;
        return (
            <SceneBuilder {...{Scene_ID: Stage.root, RComp, resolveStage}} />
        );
    }
}
StageBuilder.propTypes = {
    RComp: PropTypes.object.isRequired,
    resolveStage: PropTypes.func.isRequired,
    //redux
    Stage: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
    let { resolveStage } = props;
    let Stage = resolveStage(state);
    return {
        Stage
    };
}

export default connect(
    mapStateToProps
)(StageBuilder);