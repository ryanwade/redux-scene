import React, { PropTypes } from 'react';
import _isNull from 'lodash/isNull';
import _isString from 'lodash/isString';

import ComponentBuilder from './ComponentBuilder';

class MultiComponentBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.renderComponent = this.renderComponent.bind(this);
    }
    renderComponent(Component_ID) {
        let { Scene_ID, RComp, resolveStage } = this.props;
        return <ComponentBuilder {...{Scene_ID, Component_ID, RComp, resolveStage}} />;
    }
    render() {
        let { Component_ID = null } = this.props;
        console.log("Builder:",Component_ID);
        if(_isNull(Component_ID)) return null;
        if(_isString(Component_ID)) return this.renderComponent(Component_ID); 
        if(Component_ID.length == 1) return this.renderComponent(Component_ID[0]);
        return (
            <div>
                {Component_ID.map(this.renderComponent)}
            </div>
        );
    }
}
MultiComponentBuilder.propTypes = {
    Scene_ID: PropTypes.string.isRequired,
    Component_ID: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    RComp: PropTypes.object.isRequired,
    resolveStage: PropTypes.func.isRequired,
};

export default MultiComponentBuilder;