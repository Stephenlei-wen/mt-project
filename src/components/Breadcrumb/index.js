import React, { useEffect, useState, useReducer } from "react";
import { Link, useLocation } from "react-router-dom"
import './index.less'
import routers from '../../routes/config'
export default function Breadcrumb() {
    const location = useLocation()
    const [menus, setMenus] = useState([])
    function getMenus(pathname) {
        //把path转成普通数组
        let pathnameArry = pathname.split("/");
        let newArry = pathnameArry.filter(item => { return item && item.trim() })
        if (newArry.length === 0) {
            setMenus([])
            return
        }
        let menuArry = []
        menuArry.push(arryToNestedArray(newArry))
        let arry = flatten(menuArry)
        setMenus(arry)
    }
    //把数path的普通数组转成嵌套的数组
    let paths = '/'
    function arryToNestedArray(data) {
        let obj = {}
        obj.title = data[0]
        if (data.length === 1) {
            paths = paths + `${data[0]}`
            obj.path = paths
            return obj
        }
        paths = paths + `${data[0]}` + '/'
        obj.path = paths
        let newArry = data.splice(1, data.length - 1)
        obj.items = [arryToNestedArray(newArry)]
        return obj
    }
    //扁平化处理数组
    function flatten(data) {
        let result = [];
        data.forEach(item => {
            if (item.items) {
                result = result.concat(item, flatten(item.items));
            } else {
                result.push(item);
            };
        })
        return result;
    }
    //遍历menu (只有一层循环所以目前只适合菜单栏不分级的情况~待完善)
    function loopMenus(path) {//用name来判断某一路由是否在menus中, 返回值是 {name:"",path:""},比如 loopMenus('/aaa/bbb').name
        let str = ''
        if (path[path.length - 1] === '/' && path !== '/') {
            str = path.slice(0, path.length - 1)
        } else {
            str = path
        }
        console.log(str, "ste");
        // let groups = config.component.MENUCOMPONENT.home.groups
        let groups = routers
        let obj = { name: "", path: "", status: false } //name是当前路由对应的name,如果当前路由不存在就找本及标题作为名字,path是name对应的路由
        try {
            groups.forEach((item, index) => {
                item.routes.forEach((ite, inde) => {
                    if (ite.path === str) {
                        obj.name = ite.name
                        throw new Error();
                    }
                })
            })
        } catch (err) {
            // alert(err)
        }
        //详情判断:判断如果这个路径最后一个是数字那么就显示详情
        let pathnameArry1 = str.split("/");
        let newArry1 = pathnameArry1.filter(item => { return item && item.trim() })
        if (newArry1[newArry1.length - 1].length === 32) {
            obj.name = '详情'
        }
        return obj
    }
    useEffect(() => {
        getMenus(location.pathname)
    }, [location])
    return <div className="breadcrumb">
        <ol>
            {menus.map((item, index) => {
                return <Link key={index} className="menu-item" to={(loopMenus(item.path).name) ? item.path : loopMenus(item.path).path}>
                    <div
                        style={{ zIndex: `${menus.length - index}` }}
                        className={`breadcrumb-item breadcrumb-item-selected ${index === 0 && menus[index + 1] ? 'first-breadcrumb-item' : ''} ${!menus[index + 1] && index !== 0 ? 'last-breadcrumb-item' : ''} ${menus[index + 1] && index !== 0 ? 'middle-breadcrumb-item' : ''}`}
                    >
                        <li>
                            {menus[index + 1] && index !== 0 ? <i className="breadcrumb-li-middle-i"></i> : ""}
                            <span>{loopMenus(item.path).name || ""}</span>
                            {/* ()=>{可改进为:如果没有这个路径的话 让menus数组去掉第一个} */}
                            <i></i>
                        </li>
                    </div>
                </Link>
            })}
        </ol>
    </div>
}