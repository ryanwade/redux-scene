import _isString from 'lodash/isString';
import _isUndefined from 'lodash/isUndefined';
import _isNull from 'lodash/isNull';
import _isArray from 'lodash/isArray';
import _size from 'lodash/size';

/*
 * Implements Type Grammar found in README
 */
class TypeParser {
    constructor(renderComponent) {
        this.renderComponent = renderComponent;

        this.type = this.type.bind(this);
        this.typeDef = this.typeDef.bind(this);
        this.list = this.list.bind(this);
        this.identifier = this.identifier.bind(this);

        return this.type;
    }
    type(data) {
        if(_isUndefined(data)) throw new TypeError("Tuple cannot be undefined");
        if(!this.typeDef(data)) return data;
        switch(data[0]) {
            case "list":
                return this.list(data[1], this.type);
            case "component":
                return this.list(data[1], this.identifier);
            case "value":
                return data[1];
            default:
                return data;
        }
    }
    typeDef(data) {
        if(_isNull(data)) return false;
        if(!_isArray(data)) return false;
        if(_size(data) !== 2) return false;
        if(!_isString(data[0])) return false;
        return true;
    }
    list(data, parser) {
        if(!_isArray(data)) return parser(data);
        return data.map(d => parser(d));
    }
    identifier(data) {
        if(!_isString(data)) throw new TypeError("Must Be Component Identifier");
        return this.renderComponent(data);
    }
}

export default TypeParser;