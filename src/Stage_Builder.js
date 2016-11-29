import React from 'react';

import _isArray from 'lodash/isArray';
/*
 * UI Builder Class
 */
class Stage_Builder {
    constructor(Components = {}, FunctionAttrs_Builder = () => null) {
        this.Components = Components;
        this.FunctionAttrs_Builder = FunctionAttrs_Builder.bind(this);

        this.build = this.build.bind(this);
        this.Scene_Builder = this.Scene_Builder.bind(this);
        this.Component_Builder = this.Component_Builder.bind(this);
        this.DynamicAttrs_Builder = this.DynamicAttrs_Builder.bind(this);
    }

    /*
    * Construct UI from Redux state
    */
    build({ root, scenes} = {root: null, scenes: {}}) {
        if(root === null) return null;
        return this.Scene_Builder(scenes, root);
    }
    /*
    * Build Scene from Scene ID
    */
    Scene_Builder(scenes = {}, id = null) {
        let Scene = scenes[id];
        if(id === null || Scene === undefined) return null;
        return this.Component_Builder(scenes, Scene.components, Scene.root);
    }
    /*
    * Build Component(s) from Component ID(s)
    */
    Component_Builder(scenes = {}, components = {}, ids = []) {
        ids = _isArray(ids)? ids : [ids];
        return ids.map(id => {
            let Component = components[id];
            if(id === null || Component === undefined) return null;
            let result = null;
            let ReactComponent = null;
            switch(Component.type) {
                case "scene":
                    return this.Scene_Builder(scenes, Component.id);
                default:
                    ReactComponent = this.Components[Component.type] || Component.type;
                    result = (
                        <ReactComponent key={id} {...Component.attrs} {...this.DynamicAttr_Builder(scenes, components, Component.dynamic)} {...this.FunctionAttrs_Builder(scenes, components, Component.attrs, Component.actions)}>
                            {Component.content}
                            {this.Component_Builder(scenes, components, Component.children)}
                        </ReactComponent>
                    );
                    return result;
            }
        });
    }

    /*
    * Build Attrs which are comprised of components
    */
    DynamicAttrs_Builder(scenes = {}, components = {}, attrs = {}) {
        let ret = {};
        Object.keys(attrs).map(attr => {
            ret[attr] = this.Component_Builder(scenes, components, attrs[attr]);
        });
        return ret;
    }
}



export default Stage_Builder;