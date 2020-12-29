import Cookies from 'js-cookie'
// Base url
export const url = process.env.VUE_APP_BASE_API + '/upload'
// Request headers
export const headers = { 'Authorization': Cookies.get('Admin-Token'), 'X-Requested-With': 'XMLHttpRequest' }
