module.exports = {
    Builder: require('./dist/Builder.js').default,
    reducer: require('./dist/reducers/index.js').default,
    actionTypes: require('./dist/actionTypes/index.js'),
    actions: require('./dist/actions/index.js')
};