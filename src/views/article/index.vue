<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="filterParams.channel_id" placeholder="请选择">
              <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
         <el-button type="primary" size="small">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选
      filterParams: {
        // 如果不传值为null   默认查询全部状态
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 筛选频道
      channelOptions: [
        {
          value: '选项1',
          lable: '哈哈哈'
        }, {
          value: '选项二',
          lable: '啦啦啦'
        }
      ],
      dateArr: []
    }
  }
}
</script>

<style lang="less" scoped>
</style>
