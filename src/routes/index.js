import React, { useContext } from 'react'
import Count from '../page/count'
import ShowCount from '../page/showcount'
import Display from '../page/display/index'
import Displays from '../page/display2/index'
import context from '../reducer/index.js'
import {
    Route,
    Link,
    Routes,
} from "react-router-dom";
//不同的导航代表不同的项目 那么切换导航切换一套路由
const router = [
    {
        routes: [
            {
                path: '/page1',
                component: Count,
                sideId: "nav"//默认的路由 nav对应全局变量中的nav
            },
            {
                path: '/page2',
                component: ShowCount,
            },
            {
                path: '/page3',
                component: Display,
            },
            {
                path: '/page4',
                component: Displays,
            }
        ]
    },
    {
        routes: [
            {
                path: '/page1',
                component: Count,
                sideId: "nav1"
            },
            {
                path: '/page2',
                component: ShowCount,
            },
            {
                path: '/page3',
                component: Display,
            },
            {
                path: '/page4',
                component: Displays,
            }
        ]
    },
    {
        routes: [
            {
                path: '/page1',
                component: Count,
                sideId: "nav2"
            },
            {
                path: '/page2',
                component: ShowCount,
            },
            {
                path: '/page3',
                component: Display,
            },
            {
                path: '/page4',
                component: Displays,
            }
        ]
    }
]
function Router(props) {
    const [store, dispatch] = props.store
    const { api } = props
    let newRouter = router.filter((item) => { return item.routes[0].sideId === store.nav })
    const routeArry = newRouter[0].routes
    return <Routes>
        {
            routeArry.map((item, index) => {
                return <Route key={index} path={item.path} element={<item.component api={api} />}></Route>
            })
        }
    </Routes>
}

export default Router