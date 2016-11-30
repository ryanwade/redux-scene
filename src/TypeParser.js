import React from 'react';

import _isString from 'lodash/isString';
import _isUndefined from 'lodash/isUndefined';
import _isNull from 'lodash/isNull';
import _isArray from 'lodash/isArray';
import _size from 'lodash/size';
import _isEqual from 'lodash/isEqual';

import ComponentBuilder from './ComponentBuilder';

class typeParser {
    constructor(ref) {
        this.ref = ref;

        this.getData = this.getData.bind(this);
        this.renderSingle = this.renderSingle.bind(this);
        this.renderMulti = this.renderMulti.bind(this);
        this.typeParser = this.typeParser.bind(this);
        this.comparisonParser = this.comparisonParser.bind(this);
    }
    getData(id) {
        if(!_isString(id)) throw new TypeError("Data identifier must be string: " + id);
        let { gData = {}, Scene, Component} = this.ref.props;
        let { data: sData = {} } = Scene;
        let { data: lData = {} } = Component;
        let val = lData[id] || sData[id] || gData[id];
        return val;
    }
    renderSingle(id) {
        if(_isUndefined(id)) return null;
        if(!_isString(id)) throw new TypeError("Component identifier must be a string: " + id);
        let { Scene_ID, RComp, resolveStage } = this.ref.props;
        return <ComponentBuilder key={id} {...{Scene_ID, Component_ID: id, RComp, resolveStage}} />;
    }
    renderMulti(components) {
        if(_isString(components)) return this.renderSingle(components);
        if(_size(components) == 0) return null;
        if(_size(components) == 1) return this.renderSingle(components[1]);
        return components.map(this.renderSingle);
    }
    typeParser(data) {
        if(_isNull(data)) return null;
        if(_isUndefined(data)) throw new TypeError("Tuple cannot be undefined");
        if(!_isArray(data)) return data;
        if(_isArray(data) && _size(data) == 2) {
            switch(data[0]) {
                case "value":
                    return data[1];
                case "data":
                    if(_isArray(data[1])) return data[1].map(this.getData);
                    return this.getData(data[1]);
                case "component":
                    if(_isArray(data[1])) return data[1].map(d => this.renderMulti(this.typeParser(d)));
                    return this.renderSingle(data[1]);
                case "list":
                    if(!_isArray(data[1])) throw new TypeError("Second argument of list must be an array: " + data);
                    return data[1].map(this.tpyeParser);
                case "equal":
                    return this.comparisonParser(data[0], data[1]);
                default:
                    throw new TypeError("Invalid Tuple Type" + data);
            }
        }
        throw new TypeError("Invalid Tuple: " + data);
    }
    comparisonParser(type, data) {
        if(!_isArray(data)) throw new TypeError("Comparison Tuple Data must be of type array: " + data);
        let args = data.map(typeParser);
        switch(type) {
            case "equal": return _isEqual(...args);
            default:
                throw new TypeError("Invalid Comparison Type");
        }
    }
}

export default typeParser;