import React, {useState, useEffect} from "react";
import {Button, Input} from "antd";

import loginLogo from "../../assets/company_logo.jpg";

import './index.less';
import { LockOutlined } from "@ant-design/icons";

function Login(props) {
    const {api} = props
    
    return (
        <div className="login">
            <div className="login-area">
                <div className="login-logo">
                    <img src={loginLogo} />
                </div>
                <div className="login-welcome">
                    欢迎使用XRC
                </div>
                <div className="login-input-area">
                    <div className="login-info">
                        您的会话已超时。请重新登录。
                    </div>
                    <div className="login-input">
                        <div className="login-user">
                            <label htmlFor="user">用户名</label>
                            <Input id="user" />
                        </div>
                        <div className="login-password">
                            <label htmlFor="password">密码</label>
                            <Input.Password addonBefore={<LockOutlined />} id="password" />
                        </div>
                        <Button className="submit-btn" onClick={()=>{
                            api.login.login({data:{username:"213315169@qq.com",password:"111111"}}).then((data)=>{
                                console.log(data,"shuju");
                            })
                        }}>登录</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;