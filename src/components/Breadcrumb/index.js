import React, { useEffect, useState, useReducer } from "react";
import { Link, useLocation } from "react-router-dom"
import './index.less'
import router from '../../routes/config'
export default function Breadcrumb() {
    let groups = router
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
        //去除数组中不满足条件的项
        let argArry = []
        arry.forEach((item, index) => {
            argArry = arry.filter(item => inGroups(item.path) || isDetail(item.path))
        })
        //给数组添加映射关系
        let result = []
        argArry.forEach((item) => {
            result.push(addNewContent(item.path))
        })
        setMenus(result)
    }
    //给数组添加映射关系
    function addNewContent(pathOfArry) {
        //面包屑第一项 inGroups是true有两种情况 1在里面,不附加path 2不在里面,但是是grops的第一个就附加path
        let str = ''
        if (pathOfArry[pathOfArry.length - 1] === '/') {
            str = pathOfArry.slice(0, pathOfArry.length - 1)
        } else {
            str = pathOfArry
        }
        let content = { title: "", path: "" }
        try {
            groups.forEach((item, index) => {
                item.routes.forEach((ite, inde) => {
                    let pathnameArry = ite.path.split("/");
                    let newArry = pathnameArry.filter(ite => { return ite && ite.trim() })
                    let headerPath = '/' + newArry[0]
                    if (ite.path === str) {
                        content.title = ite.name
                        content.path = ite.path
                        throw new Error();
                    }
                    let pathArry = str.split("/");
                    let newPathArry = pathArry.filter(ite => { return ite && ite.trim() })
                    if (newPathArry.length === 1 && headerPath === str) {//现在是短路径必须在前面 待优化
                        content.title = groups[index].routes[0].name
                        content.path = groups[index].routes[0].path
                        throw new Error();
                    }
                })
            })
        } catch {
        }
        let pathnameArry = str.split("/");
        let newArry = pathnameArry.filter(item => { return item && item.trim() })
        if (newArry[newArry.length - 1].length === 32) {
            content.title = '详情'
        }
        return content
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
    //判断是否在groups中 不在的话判断这个参数path和groups的item中的第一个路经的第一项是否一样 满足条件true 
    function inGroups(path) {
        let str = ''
        if (path[path.length - 1] === '/') {
            str = path.slice(0, path.length - 1)
        } else {
            str = path
        }
        let ingroup = false
        try {
            groups.forEach((item, index) => {
                item.routes.forEach((ite, inde) => {
                    let pathnameArry = ite.path.split("/");
                    let newArry = pathnameArry.filter(item => { return item && item.trim() })
                    let headerPath = '/' + newArry[0]
                    if (ite.path === str) {
                        ingroup = true
                        throw new Error();
                    }
                    let pathArry = str.split("/");
                    let newPathArry = pathArry.filter(item => { return item && item.trim() })
                    if (newPathArry.length === 1 && headerPath === str) {
                        ingroup = true
                        throw new Error();
                    } else {
                        ingroup = false
                    }
                })
            })
        } catch {
        }
        return ingroup

    }
    //判断是否是详情
    function isDetail(path) {
        let pathnameArry = path.split("/");
        let newArry = pathnameArry.filter(item => { return item && item.trim() })
        if (newArry[newArry.length - 1].length === 32) {
            return true
        } else {
            return false
        }
    }
    useEffect(() => {
        getMenus(location.pathname)
    }, [location])
    return <div className="breadcrumb">
        <ol>
            {menus.map((item, index) => {
                return <Link key={index} className="menu-item" to={item.path}>
                    {/* <Link key={index} className="menu-item" to={(loopMenus(item.path).name && !loopMenus(item.path).status) ? item.path : loopMenus(item.path).path}> */}
                    <div
                        style={{ zIndex: `${menus.length - index}` }}
                        className={`breadcrumb-item breadcrumb-item-selected ${index === 0 && menus[index + 1] ? 'first-breadcrumb-item' : ''} ${!menus[index + 1] && index !== 0 ? 'last-breadcrumb-item' : ''} ${menus[index + 1] && index !== 0 ? 'middle-breadcrumb-item' : ''}`}
                    >
                        <li>
                            {menus[index + 1] && index !== 0 ? <i className="breadcrumb-li-middle-i"></i> : ""}
                            {/* <span>{loopMenus(item.path).name || ""}</span> */}
                            <span>{item.title}</span>
                            {/* ()=>{可改进为:如果没有这个路径的话 让menus数组去掉第一个} */}
                            <i></i>
                        </li>
                    </div>
                </Link>
            })}
        </ol>
    </div>
}