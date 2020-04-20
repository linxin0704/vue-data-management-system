<template>
  <div class="new_page">
    <el-container style=" border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(0, 21, 41)">
        <div style="height:300px; text-align:center; color:#fff; line-height:50px; font-size:30px">
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
      <el-container>
        <el-header style="text-align: left; font-size: 20px;background-color: rgb(250, 250, 250)">
          <el-input v-model="input" placeholder="请输入搜素内容" style="width:500px"></el-input>
          <el-button type="primary" @click="clickParent()">新增</el-button>
        </el-header>
        <v-data class="tableData" :value="this.input" ref="mychild"></v-data>
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
  methods: {
    clickParent() {
      this.$refs.mychild.newEdit();
    }
  }
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
