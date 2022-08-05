import React, { useEffect } from "react";
import SideMenu from "../../layout/sidemenu";
import Header from "../../layout/header";
import HeaderSub from "../../layout/headersub";
import Router from '../../routes'
import './index.css'
import api from '../../api/index'
function Page(props) {
    const [store, dispatch] = props.store
    useEffect(() => {
        //可以通过这个方法改变nav进而更改侧边栏和路由
        // dispatch({ type: "nav", nav: "1212" })
    }, [])
    return <div className="main">
        <Header store={props.store} api={api}></Header>
        <HeaderSub store={props.store} api={api}></HeaderSub>
        <SideMenu store={props.store} api={api}></SideMenu>
        <div className="main-cantainer">
            <Router store={props.store} api={api}></Router>
        </div>
    </div>
}
export default Page