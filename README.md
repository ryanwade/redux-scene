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
### Seting up redux-scene
~~~ js
    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux'; 
    import { createStore } from 'redux';
    
    import * as MyComponents from 'react-foundation-lib';
    
    import { Builder, reducer } from 'redux-scene';

    //Setup Redux
    let store = createStore(reducer);

    //Setup StageBuilder
    function resolveUI(stage) {
        return state.UI
    }

    let MyBuilder = new Builder(MyComponents, resolve, store.dispatch); 
    
    //Render Stage
    render((
            <Provider store={store}>
                <MyBuilder.Stage />
            </Provider>
        ),
        document.getElementById('root')
    );

    //Adding components to redux state
    import { actions, actionTypes } from 'redux-scene';
    store.dispatch(actions.stage.addScene('layout'));
    store.dispatch(actions.stage.setRoot('layout'));
    store.dispatch(actions.scene.addComponent('layout','button'));
    store.dispatch(actions.scene.addComponent('layout','text'));
    store.dispatch(actions.scene.addComponent('layout','div1'));
    store.dispatch(actions.scene.setRoot('layout', ['button','div1','text']));
    store.dispatch(actions.component.setType('layout','button','Button'));
    store.dispatch(actions.component.setAttr('layout','button', 'label', 'hi'));
    store.dispatch(actions.component.setEvent('layout','button','onClick', {type: "ON_CLICK", attr: 'blah'}));
    store.dispatch(actions.component.setType('layout','text','TextField'));
    store.dispatch(actions.component.setAttr('layout','text','value', 'first'));
    store.dispatch(actions.component.setEvent('layout','text','onChange', {type: actionTypes.component.SET_ATTR, attr: 'value'}));
    store.dispatch(actions.component.setType('layout','div1','div'));
    store.dispatch(actions.component.setContent('layout','div1',['component','button']));
~~~
# <div id="Builder">Builder</div>
The [Builder](#Builder) class configures the redux-stage 

### Props
| props | description |
|---|---|
| RComp | _object_ Collection of React Components ___{ name: Component, ...}___ |
| resolve | _function_ resolve(state) user defined function that returns the portion of state containing the Stage data |
| dispatch | the redux dispatch funciton |

### __function__ Stage(props)</div>
returns a [Stage](#Stage) component with the given props.

~~~ js
    <MyBuilder.Stage />
~~~

### __function__ Scene(props)
returns a [Scene](#Scene) component with the given props.

~~~ js
    <MyBuilder.Scene Scene_ID={"scene_a"}/>
~~~

### __function__ Component(props)
returns a [Component](#Component) component with the given props.

~~~ js
    <MyBuilder.Component Scene_ID={"scene_a"} Component_ID={"component_a"} />
~~~


# Elements
## <div id="Stage">Stage</div>
renders the entire redux-stage specified by the [Builder](#Builder) Object 

### State
This is the highest level of the state.  It contains a collection of [Scenes](#Scene) and the name of the current scene to build.
| attrs | definition |
|---|---|
| root  | Specifies the root [Scene](#Scene) of the [Stage](#Stage) |
| scenes | A collection of [Scene](#Scene) Objects |

~~~
{
    root: rootScene,
    scenes: {
        sceneName: Scene,
        ...
    }
}
~~~

## <div id="Scene">Scene</div>
### Props
| props | description |
|---|---|
| Scene_ID | _string_ [Scene](#Scene) identifier |

### State
A Scene contains a collection of components and the heirarchy in which to present them.  While scenes can be used in other scenes, components can only be directly used in the scene in which they are defined.
| attrs | definition |
|---|---|
| root | _string_ [Component](#Component) identifier or _array_ [_string_ [Component](#Component) identifier, ...]   Specifies the highest level components of the [Scene](#Scene) |
| components | Collection of [Components](#Component).  Each has a unique name within the [Scene](#Scene).  [Components](#Components) can only be used within the [Scene](#Scene) they are defined |

~~~
{
    root: componentName or [componentName, ...],
    components: {
        componentName: Component,
        ...
    }
}
~~~

## <div id="Component">Component</div>
### Props
| props | description |
|---|---|
| Scene_ID | _string_ [Scene](#Scene) identifier |
| Component_ID | _string_ [Component](#Component) identifier or _array_ [ _string_ [Component](#Component) identifier, ...]

### State
A [Component](#Component) contains all of the information to construct a React Component or an HTML element.

| attrs | definition |
|---|---|
| type | RComp or HTML element name |
| attrs | attr: [TypeGrammar](#TypeGrammar); defines attributes | 
| events | event: actionType pairs to dispatch actions.  actions contain the actionType and the value from the component |
| content | [TypeGrammar](#TypeGrammar); content to render inside component 

~~~
{
    type: typeName,
    attrs: {
        attr: TypeGrammar,
        ...
    },
    events: {
        event: actionType,
        ...
    },
    content: TypeGrammar
}
~~~

# <div id="TypeGrammar">Type Grammar</div>
~~~
TYPE:
       VALUE_TYPE
    || COMPONENT_TYPE
    || LIST_TYPE
    || ANY

LIST_TYPE:
    ["list", LIST<TYPE>]
VALUE_TYPE:
    ["value", ANY]
COMPONENT_TYPE:
    ["component", LIST<IDENTIFIER>]


LIST<L_TYPE>:
    L_TYPE
    || [L\_TYPE, ...]


ANY:
    !undefined
IDENTIFIER:
    [a-Z1-9\_-] ___String___
~~~

### Examples:
1. "A String"
2. ["value", "Another String"]
3. ["component", "component_ref"]
4. ["component", ["several", "components"]]
5. ["list", ["A ", "List ", "Of ", "Strings"]]
6. ["list", [["component", "a"], "mixed", ["component", "list"]]] 