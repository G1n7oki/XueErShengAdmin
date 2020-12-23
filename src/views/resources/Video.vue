<template>
  <div class="app-container">
    <!-- Filter -->
    <el-card class="filter-container">
      <div class="filter-title">筛选</div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="listQuery.name" placeholder="视频名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /Filter -->
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">视频列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加视频</el-button>
      </div>
      <!-- /Table header -->
      <!-- table -->
      <el-table
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        size="medium"
      >
        <el-table-column
          prop="title"
          label="视频名称"
          align="center"
        />
        <el-table-column
          prop="name"
          label="是否启用"
          align="center"
        />
        <el-table-column
          prop="p_name"
          label="是否试听"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="讲义名称"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table -->
    </el-card>
    <!-- Dialog -->
    <el-dialog
      title="添加视频"
      :visible.sync="dialogVisible"
    >
      <div class="content">
        <input type="file" multiple @change="fileChange($event)">
        <ul class="tips">
          <li>上传须知</li>
          <li>上传素材需适合在教学场景下使用。不得上传影视剧、动画、综艺等作品、未经授权的他人作品、 时政新闻、和色情、暴力、违禁品、反动等违法内容和过于低俗、媚俗的内容。</li>
        </ul>
      </div>
      <div class="progress-wrap">
        <div v-for="file in fileList" :key="file.uid" class="progress-item">
          <div class="name-status">
            <div class="video-name">{{ file.name }}</div>
            <div class="size">{{ parseInt(file.size / 1024 / 1024) }}M</div>
            <div class="status success">{{ file.status }}</div>
          </div>
          <div class="progress">
            <div class="line">
              <el-progress :percentage="file.progress" />
            </div>
            <i class="el-icon-video-pause icon" @click="uploader.options.onUploadstarted"/>
            <i class="el-icon-circle-close icon" />
          </div>
        </div>
      </div>
      <button @click="stsUpload">开始上传</button>
    </el-dialog>
    <!-- /Dialog -->
    <!-- Dialog -->
    <el-dialog
      title="编辑视频"
      :visible.sync="dialogVisible1"
    >
      <el-form
        ref="form"
        v-loading="formLoading"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="是否试听" prop="name">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="name">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择讲义" prop="name">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Dialog -->
  </div>
</template>

<script>
import { sts } from '@/api/sts'
export default {
  name: 'Video',
  data() {
    return {
      listQuery: {},
      loading: '',
      list: [],
      title: '',
      dialogVisible: true,
      dialogVisible1: false,
      formLoading: false,
      form: {},
      fileList: [],
      uploader: null
    }
  },
  methods: {
    fileChange (e) {
      const files = e.target.files
      if (files.length <= 0) {
        this.$message.error('请选择需要上传的文件')
        return false
      }
      if (this.uploader) {
        this.uploader.stopUpload()
      }
      this.uploader = this.createUploader()
      console.log(this.uploader)
      // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
      for(let i= 0; i < files.length; i++) {
        this.fileList.push({
          uid: files[i].lastModified,
          name: files[i].name,
          size: files[i].size,
          status: '等待上传',
          progress: 0
        })
        console.log(files[i].name)
        this.uploader.addFile(files[i], null, null, null, '{ "Vod":{"Title": "' + files[i].name + '"} }')
      }
    },
    // 开始上传
    stsUpload () {
      // 然后调用 startUpload 方法, 开始上传
      if (this.uploader !== null) {
        this.uploader.startUpload()
        this.uploadDisabled = true
        this.pauseDisabled = false
      }
    },
    createUploader() {
      const that = this
      let uploader = new AliyunUpload.Vod({
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
          console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
        },
        // 文件上传成功
        onUploadSucceed(uploadInfo) {
          console.log(uploadInfo.videoId)
          console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
          self.statusText = '文件上传成功!'
        },
        // 文件上传失败
        onUploadFailed(uploadInfo, code, message) {
          console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
          self.statusText = '文件上传失败!'
        },
        // 取消文件上传
        onUploadCanceled(uploadInfo, code, message) {
          console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
          self.statusText = '文件已暂停上传'
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress(uploadInfo, totalSize, progress) {
          console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
          let progressPercent = Math.ceil(progress * 100)
          that.fileList[0].progress = progressPercent
          self.stsProgress = progressPercent
          self.statusText = '文件上传中...'
        },
        // 上传凭证超时
        onUploadTokenExpired(uploadInfo) {
          // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
          // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
          // 这里是测试接口, 所以我直接获取了 STSToken
          let stsUrl = 'http://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateSecurityToken?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=67999yyuuuy&AppVersion=1.0.0'
          axios.get(stsUrl).then(({data}) => {
            let info = data.SecurityTokenInfo
            let accessKeyId = info.AccessKeyId
            let accessKeySecret = info.AccessKeySecret
            let secretToken = info.SecurityToken
            let expiration = info.Expiration
            uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
          })
          self.statusText = '文件超时...'
        },
        // 全部文件上传结束
        onUploadEnd(uploadInfo) {
          console.log("onUploadEnd: uploaded all the files")
          self.statusText = '文件上传完毕'
        }
      })
      return uploader
    },
    handleQuery() {},
    handleCreate() {},
    handleUpdate() {},
    handleDelete() {},
    handleSave() {}
  }
}
</script>

<style scoped>
.content {
  width: 60%;
  margin: 0 auto;
  text-align: center;
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
</style>
