import req from './lib'
const api = {
    list: (option) => {
        option.data = option.data || {};
        return req({
            url: `/api/vm/asset_softwares/stats/${option.target}`,
            method: 'get',
            ...option
        })
    },
}
export default api