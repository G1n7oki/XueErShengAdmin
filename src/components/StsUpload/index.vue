<template>
  <div class="sts-upload">
    <div class="content">
      <el-button type="primary">选择文件</el-button>
      <input type="file" multiple :accept="accept" class="file" @change="fileChange($event)">
    </div>
    <div class="progress-wrap">
      <div v-for="file in fileList" :key="file.uid" class="progress-item">
        <div class="name-status">
          <div class="video-name">{{ file.name }}</div>
          <div class="size">{{ parseInt(file.size / 1024 / 1024) }}M</div>
          <!-- <div class="status success">{{ file.status }}</div> -->
        </div>
        <div class="progress">
          <div class="line">
            <el-progress :percentage="file.progress" />
          </div>
          <!-- <i class="el-icon-video-pause icon" /> -->
          <!-- <i class="el-icon-circle-close icon" /> -->
        </div>
      </div>
    </div>
    <div v-if="fileList.length > 0" class="button-group">
      <el-button type="primary" @click="stsUpload">开始上传</el-button>
      <el-button @click="handleComplete">完成</el-button>
    </div>
    <ul class="tips">
      <li>上传须知</li>
      <li>上传素材需适合在教学场景下使用。不得上传影视剧、动画、综艺等作品、未经授权的他人作品、 时政新闻、和色情、暴力、违禁品、反动等违法内容和过于低俗、媚俗的内容。</li>
    </ul>
  </div>
</template>

<script>
import { sts } from '@/api/sts'
import { video_create } from '@/api/resources'
export default {
  name: 'StsUpload',
  props: {
    accept: {
      type: String,
      default: 'video/*'
    }
  },
  data() {
    return {
      fileList: [],
      uploader: null,
      complete: false
    }
  },
  methods: {
    fileChange(e) {
      this.fileList = []
      const files = e.target.files
      if (files.length <= 0) {
        this.$message.error('请选择需要上传的文件')
        return false
      }
      if (this.uploader) {
        this.uploader.stopUpload()
      }
      this.uploader = this.createUploader()
      // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
      for (let i = 0; i < files.length; i++) {
        this.fileList.push({
          uid: files[i].i,
          name: files[i].name,
          size: files[i].size,
          status: '等待上传',
          progress: 0
        })
        this.uploader.addFile(files[i], null, null, null, '{ "Vod":{"Title": "' + files[i].name + '"} }')
      }
    },
    // 开始上传
    stsUpload() {
      // 然后调用 startUpload 方法, 开始上传
      if (this.uploader !== null) {
        this.uploader.startUpload()
      }
    },
    // 取消上传
    stsStop() {
      // 然后调用 startUpload 方法, 开始上传
      if (this.uploader !== null) {
        this.uploader.stopUpload()
      }
    },
    createUploader() {
      const that = this
      //
      const uploader = new AliyunUpload.Vod({ // eslint-disable-line
        timeout: 60000,
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: 'cn-shanghai',
        userId: '1303984639806000',
        // 添加文件成功
        addFileSuccess(uploadInfo) {
          // console.log(uploadInfo)
        },
        // 开始上传
        async onUploadstarted(uploadInfo) {
          const response = await sts()
          const { AccessKeyId, AccessKeySecret, SecurityToken } = response.data
          uploader.setSTSToken(uploadInfo, AccessKeyId, AccessKeySecret, SecurityToken)
          // console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
        },
        // 文件上传成功
        async onUploadSucceed(uploadInfo) {
          const response = await video_create({
            aliyun_id: uploadInfo.videoId,
            name: uploadInfo.file.name
          })
          console.log(response)
          // console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
        },
        // 文件上传失败
        onUploadFailed(uploadInfo, code, message) {
          that.$message.error(`${uploadInfo.file.name}上传失败, message: ${message}`)
          that.stsStop()
          // console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
        },
        // 取消文件上传
        onUploadCanceled(uploadInfo, code, message) {
          console.log('取消文件上传')
          // console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress(uploadInfo, totalSize, progress) {
          // console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
          const index = that.fileList.findIndex(item => {
            return item.name === uploadInfo.file.name
          })
          const progressPercent = Math.ceil(progress * 100)
          that.fileList[index].progress = progressPercent
        },
        // 上传凭证超时
        onUploadTokenExpired(uploadInfo) {
          // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
          // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
          // 这里是测试接口, 所以我直接获取了 STSToken
          // const stsUrl = 'http://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateSecurityToken?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=67999yyuuuy&AppVersion=1.0.0'
          // axios.get(stsUrl).then(({data}) => {
          //   let info = data.SecurityTokenInfo
          //   let accessKeyId = info.AccessKeyId
          //   let accessKeySecret = info.AccessKeySecret
          //   let secretToken = info.SecurityToken
          //   let expiration = info.Expiration
          //   uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
          // })
          // self.statusText = '文件超时...'
        },
        // 全部文件上传结束
        onUploadEnd(uploadInfo) {
          // console.log("onUploadEnd: uploaded all the files")
          that.complete = true
        }
      })
      return uploader
    },
    handleComplete() {
      if (this.complete) {
        this.fileList = []
        this.complete = false
        this.$emit('complete', this.complete)
      } else { // 视频未上传完毕
        this.$confirm('还有文件未上传完毕, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.fileList = []
          this.complete = false
          this.$emit('complete', this.complete)
          this.stsStop()
        }).catch(() => {})
      }
    }
  }
}
</script>

<style scoped>
.content {
  width: 60%;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.file {
  width: 98px;
  height: 36px;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -49px;
  opacity: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-top: 20px;
}
.tips {
  margin: 32px 0;
}
.progress-item {
  border-bottom: 1px dotted #bbbbbb;
  padding-bottom: 21px;
  margin-bottom: 21px;
}
.name-status {
  display: flex;
  justify-content: space-between;
  width: 84%;
}
.size {
  flex: 1;
  margin-left: 34px;
}
.status.success {
  color: #259B24;
}
.progress-wrap {
  margin-top: 32px;
}
.progress {
  display: flex;
  align-items: flex-end;
}
.progress .line {
  width: 90%;
}
.icon {
  font-size: 24px;
  margin-right: 15px;
}
.button-group {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
