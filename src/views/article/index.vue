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
          <!-- clearable 清楚选项 -->
          <el-select v-model="filterParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()" size="small">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- --------------------- -->
    <el-card>
      <div slot="header">根据筛选条件共查询到{{total}}条结果：</div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" style="width:150px;height:100px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="danger">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" @click="toEdit(scope.row.id)" plain icon="el-icon-edit" circle></el-button>
            <el-button type="danger" @click="delArticle(scope.row.id)" plain icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!--  @current-change="changeParger" 当前页改变时会触发 -->
      <el-pagination
      style="margin-top:20px;text-align:right"
      background
      layout="prev, pager, next"
      @current-change="changePager"
      :total="total"
      :current-page="filterParams.page"
      :page-size="filterParams.per_page"
      ></el-pagination>
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
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 筛选频道
      channelOptions: [],
      // 日期选择后的数组  [起始日期，结束日期]
      dateArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },
  // 页面渲染即调用函数
  created () {
    this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 获取频道选项数据
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 获取文章列表数据
    async getArticles () {
      // 若是 post 传参，放到请求主题提交body  axios.post(url,请求体传参)
      // 若是 get 传参， 放到请求的地址 ？ 后面 axios.get(url,{params:传参对象})
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.filterParams })
      // console.log(data)
      this.articles = data.results
      console.log(this.articles[0].id.toString())
      // 总条数
      this.total = data.total_count
    },
    // 日期处理函数
    changeDate (value) {
      // if (!value) value = [null, null]
      // 以下代码同以上
      if (value) {
        this.filterParams.begin_pubdate = value[0]
        this.filterParams.end_pubdate = value[1]
      } else {
        this.filterParams.begin_pubdate = null
        this.filterParams.end_pubdate = null
      }
    },
    // 频道选择处理函数
    changeChannel () {
      if (this.filterParams.channell_id === '') {
        this.filterParams.channel_id = null
      }
    },
    // 改变分页
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getArticles()
    },
    // 搜索
    search () {
      // 每次搜索的时候页码更改为 1
      this.filterParams.page = 1
      this.getArticles()
    },
    // 删除文章
    async delArticle (articleId) {
      try {
        await this.$http.delete(`articles/${articleId}`)
        this.$message.success('删除成功')
        this.getArticles()
      } catch (e) {
        console.log(e)
        this.$message.error('删除失败')
      }
    },
    // 编辑 ， 地址栏传参跳转  跳转到发布文章
    toEdit (articleId) {
      this.$router.push(`/publish?id=${articleId}`)
    }

  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
