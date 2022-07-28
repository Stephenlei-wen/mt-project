import React, { useReducer } from "react";
export default function Page(props) {
    let initState = {
        count: 0,
        isShow: false
    }
    function countReducer(initState, action) {
        switch (action.type) {
            case 'increment':
                return { ...initState, count: initState.count + 1 }
            case "show":
                return { ...initState, isShow: !initState.isShow }
            default:
                return initState
        }
        // return { ...initState, count: initState.count + 1 }
    }
    let [store, dispatch] = useReducer(countReducer, initState)
    return <div>
        {store.count}
        {
            store.isShow ? <div>显示</div> : ""
        }
        <button onClick={() => { dispatch({ type: "increment" }) }}>增加</button>
        <button onClick={() => { dispatch({ type: "show" }) }}>显示</button>
    </div >
}