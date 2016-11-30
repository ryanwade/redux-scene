# redux-scene
React UI generated from redux state

# Usage
## Installation
~~~
npm install --save redux-scene

//Dependencies
npm install --save react react-dom redux react-redux

//Related
npm install react-foundation-lib
~~~

## Example
~~~ js
    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux'; 
    import { createStore } from 'redux';
    
    import * as MyComponents from 'react-foundation-lib';
    import { StageBuilder } from 'redux-scene';
    function StageReducer(state, action) {
        switch(action.type) {
            //handle actions
            default:
                return state;
        }
    }

    //Setup Redux
    let store = createStore(StageReducer);

    //Setup StageBuilder
    function resolveStage(stage) {
        return state.UI
    }

    //Render Stage
    render((
            <Provider store={store}>
                <StageBuilder RComp={MyComponents} resolveStage={resolveStage} />
            </Provider>
        ),
        document.getElementById('root')
    );
~~~
# Docs
## <div id="Stage">StageBuilder</div>
Reads Stage data from state and builds a UI from collection of React Components and html elements
### Props
| props | description |
|---|---|
| RComp | _object_ Collection of React Components ___{ name: Component, ...}___ |
| resolveStage | _function_ resolveStage(state) user defined function that returns the portion of state containing the Stage data |

### State
This is the highest level of the state.  It contains a collection of [Scenes](#Scene) and the name of the current scene to build.
| attrs | definition |
|---|---|
| root  | Specifies the root [Scene](#Scene) of the [Stage](#Stage) |
| scenes | A collection of [Scene](#Scene) Objects |
| data | [Stage](#Stage) state [data](#Data) |

~~~
{
    root: rootScene,
    scenes: {
        sceneName: Scene,
        ...
    },
    data: {
        dataName: value,
        ...
    }
}
~~~

## <div id="Scene">SceneBuilder</div>
### Props
| props | description |
|---|---|
| Scene_ID | _string_ [Scene](#Scene) identifier |
| RComp | _object_ Collection of React Components ___{ name: Component, ...}___ |
| resolveStage | _function_ resolveStage(state) user defined function that returns the portion of state containing the Stage data |

### State
A Scene contains a collection of components and the heirarchy in which to present them.  While scenes can be used in other scenes, components can only be directly used in the scene in which they are defined.
| attrs | definition |
|---|---|
| root | _string_ [Component](#Component) identifier or _array_ [_string_ [Component](#Component) identifier, ...]   Specifies the highest level components of the [Scene](#Scene) |
| components | Collection of [Components](#Component).  Each has a unique name within the [Scene](#Scene).  [Components](#Components) can only be used within the [Scene](#Scene) they are defined |
| data | [Scene](#Scene) state [data](#Data) |

~~~
{
    root: componentName or [componentName, ...],
    components: {
        componentName: Component,
        ...
    },
    data: {
        dataName: value,
        ...
    }
}
~~~

## <div id="Component">ComponentBuilder</div>
### Props
| props | description |
|---|---|
| Scene_ID | _string_ [Scene](#Scene) identifier |
| Component_ID | _string_ [Component](#Component) identifier or _array_ [ _string_ [Component](#Component) identifier, ...]
| RComp | _object_ Collection of React Components ___{ name: Component, ...}___ |
| resolveStage | _function_ resolveStage(state) user defined function that returns the portion of state containing the Stage data |

### State
A Component contains all of the information to construct a React Component or an HTML element.  Attributes for the component are divided into 3 types: 1) "attrs" or primitives , 2) "dynamic" or components, and 3) "actions" or functions.
| attrs | definition |
|---|---|
| type | RComp or HTML element name |
| attrs | attr: value pairs |
| __fixed | contains primitives, arrays, and objects |
| __data | derived from state [data](#Data). |
| __dataComponents | component names derived from state [data](#Data) |
| __components | _string_ [Component](#Component) identifier or _array_ [ _string_ [Component](#Component) identifier, ...] | 
| events | event: actionType pairs to dispatch actions.  actions contain the actionType and the value from the component |
| content | renders inside component |
| __fixed | constant content to render such as a primitive |
| __data | content derived from state [data](#Data) |
| __dataComponents | component names derived from state [data](#Data) |
| __components | _string_ [Component](#Component) identifier or _array_ [ _string_ [Component](#Component) identifier, ...] |
| data | [Component](#Component) state [data](#Data) |

~~~
{
    type: typeName,
    attrs: {
        fixed: {
            attr: value,
            ...
        },
        data: {
            attr: dataName,
            ...
        },
        dataComponents: {
            attr: dataName,
            ...
        },
        components: {
            attr: componentName or [componentName, ...],
            ...
        }
    },
    events: {
        event: actionType,
        ...
    },
    content: {
        fixed: value,
        data: [
            dataName,
            ...
        ],
        dataComponents: [
            dataName,
            ...
        ]
        components: [
            componentName or [componentName, ...],
            ...
        ]
    },
    data: {
        dataName: value,
        ...
    }
}
~~~

## <div id="Data">Data</div>
Component Data is stored at all three levels and is searched in the following order

[Component](#Component) Data -> [Scene](#Scene) Data -> [Stage](#Stage) Data

When the identifier is found, the search stops.

If the same name is used at multiple levels, the lowest level is returned effectively hiding data stored higher up the state.