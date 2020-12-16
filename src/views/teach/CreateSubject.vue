<template>
  <div>
    <el-dialog
      :title="title + '科目'"
      :visible.sync="dialogVisible"
      @close="close"
    >
      <el-form
        ref="form"
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="上级分类">
          <div>{{ category }}</div>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="数字越大约排前" />
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { classify_create, classify_read, classify_update } from '@/api/teach'
export default {
  name: 'CreateSubject',
  props: {
    title: {
      type: String,
      default: '添加'
    },
    category: {
      type: String,
      default: ''
    },
    pid: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        name: '',
        sort: '',
        status: '',
        level: 4
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        status: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
      },
      dialogVisible: true,
      loading: false
    }
  },
  async created() {
    if (this.id) {
      this.loading = true
      const response = await classify_read({ id: this.id })
      const { id, name, sort, pid, status } = response.data
      this.form.id = id
      this.form.name = name
      this.form.sort = sort
      this.form.pid = pid
      this.form.status = status
      this.loading = false
    }
  },
  methods: {
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.title === '添加' ? this.create() : this.update()
        } else {
          return false
        }
      })
    },
    async create() {
      this.form.pid = this.pid
      this.loading = true
      await classify_create(this.form)
      this.$message.success('添加成功')
      this.loading = false
      this.close()
      this.$emit('update', true)
    },
    async update() {
      this.loading = true
      await classify_update(this.form)
      this.$message.success('更新成功')
      this.loading = false
      this.close()
      this.$emit('update', true)
    },
    close() {
      this.dialogVisible = true
      this.$emit('close', false)
    }
  }
}
</script>

<style scoped>

</style>
