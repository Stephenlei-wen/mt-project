import React, { useState } from "react";
import {
    Route,
    Link,
    Routes,
} from "react-router-dom";
export default function SideMenu(props) {
    const [store, dispatch] = props.store
    let [currentIndex, setCurrentIndex] = useState(0)
    let sidemenu = [
        {
            linkArr: [
                {
                    path: '/page1',
                    label: '页面1',
                    sideId: "nav"
                },
                {
                    path: '/page2',
                    label: '页面2'
                },
                {
                    path: '/page3',
                    label: '页面3'
                },
                {
                    path: '/page4',
                    label: '页面4'
                },
                {
                    path: '/login',
                    label: '登录'
                },
            ]
        },
        {
            linkArr: [
                {
                    path: '/xrc/antvg6',
                    label: 'antvg6',
                    sideId: "nav1"
                },
                {
                    path: '/page2',
                    label: '页面2'
                },
                {
                    path: '/page3',
                    label: '页面3'
                },
                {
                    path: '/page4',
                    label: '页面4'
                },
                {
                    path: '/login',
                    label: '登录'
                },
            ]
        },
        {
            linkArr: [
                {
                    path: '/page1',
                    label: '页面1',
                    sideId: "nav2"
                },
                {
                    path: '/page2',
                    label: '页面2'
                },
                {
                    path: '/page3',
                    label: '页面3'
                }
            ]
        },
    ]
    let newSidemenu = sidemenu.filter((item) => { return item.linkArr[0].sideId === store.nav })
    let menuArry = newSidemenu[0].linkArr
    return <div>
        <ul className="list">
            {
                menuArry.map((item, index) => {
                    return <li className="list-item" key={index}><Link to={item.path} className={`${index === currentIndex ? 'active' : ''}`}>{item.label}</Link></li>
                })
            }
        </ul>
    </div>
}