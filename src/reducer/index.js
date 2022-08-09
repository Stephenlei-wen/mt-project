import React from 'react'
let initState = {
    count: 0,
    isShow: false,
    nav: "nav"
}
//nav默认的页面
//nav1默认的xrc项目的页面
function countReducer(initState, action) {
    switch (action.type) {
        case 'increment':
            return { ...initState, count: initState.count + 1 }
        case 'decrement':
            return { ...initState, count: initState.count - 1 }
        case "show":
            return { ...initState, isShow: !initState.isShow }
        case "nav":
            return { ...initState, nav: action.nav }
        default:
            return initState
    }
}
let context = React.createContext()
export {
    countReducer,
    initState,
    context
}
