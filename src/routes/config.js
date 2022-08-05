import Count from '../page/count'
import ShowCount from '../page/showcount'
import Display from '../page/display/index'
import Displays from '../page/display2/index'
import Login from '../page/Login/index'
const router = [
    {
        routes: [
            {
                path: '/page1',
                component: Count,
                sideId: "nav",//默认的路由 nav对应全局变量中的nav
                name: "第1页"
            },
            {
                path: '/page2',
                component: ShowCount,
                name: "第2页"
            },
            {
                path: '/page3',
                component: Display,
                name: "第3页"
            },
            {
                path: '/page4',
                component: Displays,
                name: "第4页"
            },
            {
                path: '/login',
                component: Login,
                name: "登录页"
            }
        ]
    },
    {
        routes: [
            {
                path: '/page1',
                component: Count,
                sideId: "nav1",
                name: "登录页1"
            },
            {
                path: '/page2',
                component: ShowCount,
                name: "登录页1"
            },
            {
                path: '/page3',
                component: Display,
                name: "登录页"
            },
            {
                path: '/page4',
                component: Displays,
                name: "登录页"
            }
        ]
    },
    {
        routes: [
            {
                path: '/page1',
                component: Count,
                sideId: "nav2",
                name: "登录页1"
            },
            {
                path: '/page2',
                component: ShowCount,
                name: "登录页1"
            },
            {
                path: '/page3',
                component: Display,
                name: "登录页"
            },
            {
                path: '/page4',
                component: Displays,
                name: "登录页"
            }
        ]
    }
]
export default router