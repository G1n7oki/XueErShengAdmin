import request from '@/utils/request'

// 添加视频
export function video_create(data) {
  return request({
    url: '/video/add',
    method: 'post',
    data
  })
}
