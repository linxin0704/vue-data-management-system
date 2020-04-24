<template>
  <div class="login_page">
    <section class="form_contianer">
      <div class="manage_tip">
        <p>第一个后台管理系统</p>
      </div>
      <el-form>
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="uname"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="login(uname)">登陆</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import { loginData } from "../until./api";
export default {
  data() {
    return {
      uname: "",
      pwd: ""
    };
  },
  methods: {
    login(uname) {
      console.log(uname);
      let self = this;
      let data = {
        username: this.uname,
        password: this.pwd
      };
      loginData(data).then(r => {
        console.log(r.code);
        if (r.code === 200) {
          self.$router.push({ path: "/table" });
        } else {
          self.$message.error("账号或密码错误，请重新填写");
        }
      });
    }
  }
};
</script>
<style scoped>
@import "../assets/css/login.css";
</style>