import React, { useEffect } from "react";
import SideMenu from "../../layout/sidemenu";
import Header from "../../layout/header";
import Router from '../../api/router'
import './index.css'
function Page(props) {
    const [store, dispatch] = props.store
    useEffect(() => {
        //可以通过这个方法改变nav进而更改侧边栏和路由
        // dispatch({ type: "nav", nav: "1212" })
    }, [])
    return <div className="main">
        <Header store={props.store}></Header>
        <SideMenu store={props.store}></SideMenu>
        <div className="main-cantainer">
            <Router store={props.store}></Router>
        </div>
    </div>
}
export default Page