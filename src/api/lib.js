import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json';
const client = axios.create({});

// client.defaults.baseURL = 'http://10.1.16.36:10280';
// 添加请求拦截器
client.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        const auth = localStorage.getItem('authorization');
        if (auth) {
            config.headers.authorization = auth;
        }
        // 无需权限验证时
        if (config.noAuth) {
            delete config.headers.authorization
        }
        if (config.method === 'get') {
            config.params = config.data || {}
        }
        else {
            config.params = {};
            if (!config.data instanceof FormData) {
                config.headers['Content-Type'] = 'application/json';
                config.data = JSON.stringify(config.data)
            }
        }
        config.params.__r__ = parseInt(Math.random() * 100000000);
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
client.interceptors.response.use(
    // 对响应数据做点什么
    res => {
        if (res.headers['content-disposition']) {
            res.data.filename = res.headers['content-disposition'].split('=')[1]
        }
        return res.data
    },
    error => {
        // 对响应错误做点什么
        const err = Promise.reject(error);
        err.then(null, xhr => {
            if (xhr.response) {
                const response = xhr.response;
                if (response.status === 401) {
                    localStorage.removeItem('authorization');
                    return window.location.href = '/sp/login';
                }
                if (response.status === 409 || response.status === 406) {
                    // return Notification.error({
                    //     message: `错误 [响应码：${response.status}]`,
                    //     description: response.data.err_msg
                    // })
                    return alert(response.status, response.data.err_msg)
                }
                if (!response.data.err_name) {
                    return alert(response.status, "与服务器通信失败")
                    // return Notification.error({
                    //     message: `错误 [响应码：${response.status}]`,
                    //     description: '与服务器通信失败'
                    // })
                }
                // return Notification.error({
                //     message: response.data.err_name,
                //     description: response.data.err_msg
                // })
                return alert(response.data.err_name, response.data.err_msg)
            }
        });
        return Promise.reject(error);
    }
);

export default client