import httpInstance from '@/utils/request.js'

//上传资源数据
const uploadResourcesAPI = (data) => {
  return httpInstance({
    url: '/api/upload',
    method: 'POST',
    data
  })
}

//上传资源数据
const delResourcesAPI = (name) => {
  return httpInstance({
    url: '/api/delete',
    method: 'POST',
    data: { name }
  })
}

export { uploadResourcesAPI, delResourcesAPI }
