import React, { useContext } from 'react'
import context from '../reducer/index.js'
import {
    Route,
    Link,
    Routes,
} from "react-router-dom";
//不同的导航代表不同的项目 那么切换导航切换一套路由
import router from './config'
function Router(props) {
    const [store, dispatch] = props.store
    const { api } = props
    let newRouter = router.filter((item) => { return item.routes[0].sideId === store.nav })
    const routeArry = newRouter[0].routes
    console.log(routeArry,"现在的路由");
    return <Routes>
        {
            routeArry.map((item, index) => {
                return <Route key={index} path={item.path} element={<item.component api={api} />}></Route>
            })
        }
    </Routes>
}

export default Router