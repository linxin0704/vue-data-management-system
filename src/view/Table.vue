<template>
  <div class="new_page">
    <el-container>
      <el-header>后台管理系统</el-header>

      <el-container style=" border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(0, 21, 41)">
          <div style="text-align:center; color:#fff;  line-height:30px; font-size:20px">
            <p>Logo</p>
          </div>
          <el-menu>
            <el-submenu index="1">
              <template slot="title" style="background-color: rgb(0, 21, 41)">
                <i></i>问答数据
              </template>
              <el-menu-item index="1-1">已存数据</el-menu-item>
              <el-menu-item index="1-2">用户反馈</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vData from "../components/mainData";
export default {
  data() {
    return {
      input: ""
    };
  },
  components: {
    vData
  },
  methods: {}
};
</script>
<style>
.el-aside {
  color: #333;
}

.tableData {
  width: 100%;
}
</style>
