import { Stage, Scene, Component } from './elements';

class Builder {
    constructor(RComp, resolve, dispatch) {
        this.RComp = RComp;
        this.resolve = resolve;
        this.dispatch = dispatch;

        this.Stage = this.Stage.bind(this);
        this.Scene = this.Scene.bind(this);
        this.Component = this.Component.bind(this);

        this.setDispatch = this.setDispatch.bind(this);
        this.getData = this.getData.bind(this);
    }

    setDispatch(Component, event) {
        return (e, getVal = (e) => e.target.value) => this.dispatch({
            type: event,
            Scene_ID: Component.props.Scene_ID,
            Component_ID: Component.props.Component_ID,
            value: getVal(e)
        });
    }
    Stage(props) {
        props.Builder = this;
        return new Stage(props);
    }
    Scene(props) {
        props.Builder = this;
        return new Scene(props);
    }
    Component(props) {
        props.Builder = this;
        return new Component(props);
    }
}

export default Builder;