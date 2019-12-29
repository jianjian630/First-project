<template>
  <el-container class="box">
    <el-aside :width="isOpen?'200px':'64px'">
      <div class="logo" :class="{minLogo:!isOpen}"></div>
      <!-- 注意route 和router的区别 -->
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-s-tools"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
      <span @click="toggleAside" class="el-icon-s-fold icon"></span>
        江苏传智播客科技教育有限公司
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="photo" alt="">
            <span class="user-name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-custom" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 二级路由现实的位置 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 表示做菜单是展开还是收起
      isOpen: true,
      // 声明数据
      name: '',
      photo: ''
    }
  },
  methods: {
    toggleAside () {
      this.isOpen = !this.isOpen
    },

    // 参考文档第三天，还有第二种方法
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.delUser()
      this.$router.push('/login')
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  }
}
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("../../assets/logo_admin.png") no-repeat center;
      background-size: 140px;
    }
    .minLogo{
      background: #002244  url(../../assets/logo_admin_01.png) no-repeat center;
      background-size: 36px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    font-size: 24px;
    line-height: 60px;
    vertical-align: middle;
    .el-dropdown{
        float: right;
        span{
            img{
                width: 36px;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
    }
  }
}
</style>
