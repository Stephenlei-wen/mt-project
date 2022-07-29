import req from './lib'
const api = {
    list: (option) => {
        option.data = option.data || {};
        return req({
            url: '/api/ao/hosts',
            method: 'get',
            ...option
        })
    },
}
export default api