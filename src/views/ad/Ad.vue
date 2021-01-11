<template>
  <div class="app-container">
    <el-card>
      <!-- Table header -->
      <div class="table-header">
        <div class="left">
          <div class="name">广告列表</div>
        </div>
        <el-button type="primary" @click="handleCreate">添加广告</el-button>
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
          type="index"
          align="center"
        />
        <el-table-column
          prop=""
          label="广告名称"
          align="center"
        />
        <el-table-column
          label="缩略图"
          align="center"
        >
          <template slot-scope="{row}">
            <el-image :src="row.head" style="max-width: 100px">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="图片类型"
          align="center"
        />
        <el-table-column
          prop=""
          label="排序"
          align="center"
        />
        <el-table-column
          prop=""
          label="适用范围"
          align="center"
        />
        <el-table-column
          prop=""
          label="跳转类型"
          align="center"
        />
        <el-table-column
          prop=""
          label="是否启用"
          align="center"
        />
        <el-table-column
          prop=""
          label="添加时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button type="danger" size="mini" @click="handleUpdate(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table -->
      <!-- Page -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.per_page"
        @pagination="toData"
      />
      <!-- /Page -->
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Ad',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {},
      loading: false,
      list: [],
      total: 0
    }
  },
  methods: {
    toData() {},
    handleCreate() {}
  }
}
</script>

<style scoped>

</style>
