import Cookies from 'js-cookie'

export const url = process.env.VUE_APP_BASE_API + '/upload'

export const headers = { 'Authorization': Cookies.get('Admin-Token'), 'X-Requested-With': 'XMLHttpRequest' }
