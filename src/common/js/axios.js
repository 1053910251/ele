import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 你的主機地址
axios.defaults.baseURL = ''

// post传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  // 在发送请求前做某件事
  if (config.method === 'post') {
    // post传参序列化
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// 返回状态判断
axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export default function(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
