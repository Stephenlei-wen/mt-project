import React from "react";
import {
    Route,
    Link,
    Routes,
} from "react-router-dom";
import './index.less'
export default function Header(props) {
    const [store, dispatch] = props.store
    const navArry = [
        { title: "导航1", sideId: "nav", path: "/page1" },
        { title: "真实页面", sideId: "nav1" },
        { title: "导航3", sideId: "nav2", path: "/" },
        { title: "导航4", sideId: "nav2", path: "/" },
    ]
    return <div className="main-header">
        {navArry.map((item, index) => {
            return <Link className="main-header-item" key={index} to={item.path || ''} onClick={() => { dispatch({ type: "nav", nav: item.sideId }) }}>{item.title}</Link>
        })}
    </div>
}