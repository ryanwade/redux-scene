import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/*
 * Stage Builder Class
 */
class Stage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { Builder, Stage } = this.props;
        return (
            <Builder.Scene Scene_ID={Stage.root} />
        );
    }
}
Stage.propTypes = {
    //Builder
    Builder: PropTypes.object.isRequired,
    //redux
    Stage: PropTypes.object.isRequired
};

function mapStateToProps(state, {Builder}) {
    let Stage = Builder.resolve(state);
    return {
        Stage
    };
}

export default connect(
    mapStateToProps
)(Stage);