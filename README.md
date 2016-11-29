# redux-scene
State Generated UI

# Stage_Builder
## <div id="Constructor">_function_ Constructor([React_Components](#Constructor), [FunctionAttrs_Builder](#FunctionAttrs_Builder))
Create an instance of a Stage Builder.  Specify the collection of React Components to use.
### args
| args | description |
|---|---|
| Components | Collection of React Components ___{ name: Component, ... }___ |
| [FunctionAttrs_Builder](#FunctionAttrs_Builder) | function that transforms Component.action object into function attributes |

## <div id="FunctionAttrs_Builder">_function_ FunctionAttrs_Builder([scenes](#Scene), [components](#Component), [actions](#Component))</div>
Used to create functions to dispatch actions on UI events
### args
| args | description |
|---|---|
| scenes | Collection of [Scenes](#Scene) as found in state |
| components | Collection of [Components](#Component) found in the current [Scene](#Scene) |
| actions | Collection of actions to be transformed into Function Attributes. |

## <div id="Build">_function_ Build([state](#State))</div>
Builds a react component from a Stage
### args
| args | description |
|---|---|
| state | the [Stage](#Stage) to build 

# <div id="State">State</div>
## <div id="Stage">Stage:</div>
### Props
| props | definition |
|---|---|
| root | Specifies the root [Scene](#Scene) of the [Stage](#Stage) |
| scenes | A collection of [Scene](#Scene) Objects |
### Description
This is the highest level of the state.  It contains a collection of [Scenes](#Scene) and the name of the current scene to build. 
### State
~~~
{
    root: rootScene,
    scenes: {
        sceneName: Scene,
        ...
    }
}
~~~
## <div id="Scene">Scene:</div>
### Props
| props | definition |
|---|---|
| root | Specifies the root component of the scene.  (i.e. the highest level component of the scene) |
| components | Collection of components.  Each has a unique name within the scene.  Components can only be used within the scene they are defined |
### Description
A Scene contains a collection of components and the heirarchy in which to present them.  While scenes can be used in other scenes, components can only be directly used in the scene in which they are defined.
### State
~~~
{
    root: rootComponent,
    components: {
        componentName: Component,
        ...
    }
}
~~~

## <div id="Component">Component:</div>
### Props
| props | definition |
|---|---|
| type | React Component Name or HTML5 element name |
| attrs | key value pairs containing primitives, arrays, and objects |
| dynamic | [Component](#Component) name or [[Component](#Component) name, ...]
| actions | key value pairs that are transformed into functions by [FunctionAttrs_Builder](#FunctionAttrs_Builder)
### Description
A Component contains all of the information to construct a React Component or an HTML element.  Attributes for the component are divided into 3 types: 1) "attrs" or primitives , 2) "dynamic" or components, and 3) "actions" or functions.
### State
~~~
{
    type: typeName
    attrs: {
        key: value,
        ...
    }
    dynamic: {
        key: componentName,
        ...
    }
    actions: {
        key: value,
        ...
    }
}
~~~