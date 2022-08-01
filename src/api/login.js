import req from './lib'
import md5 from 'md5'
const api = {
    login: (option) => {
        option.data = { ...option.data, password: md5(option.data.password) };
        return req({
            url: `/api/platform/account/login`,
            method: 'post',
            noAuth: true,
            ...option
        })
    },
}
export default api