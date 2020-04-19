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
          <el-input v-model="input" placeholder="请输入搜素内容" style="width:500px;margin-right:500px"></el-input>
          <el-button type="primary" @click="newEdit()">新增</el-button>
        </el-header>

        <el-main style="background-color: rgb(240, 242, 245)">
          <el-table
            :data="tableData"
            border
            style="width: 100%;background-color: rgb(250, 250, 250)"
          >
            <el-table-column prop="question" label="问题" width="350"></el-table-column>
            <el-table-column prop="answer" label="答案" width="450"></el-table-column>
            <el-table-column prop="reading" label="阅读量" width="200"></el-table-column>
            <el-table-column label="操作" width="260">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog
      :title="this.title"
      :visible.sync="editFormVisible"
      :close-on-click-modal="true"
      :append-to-body="true"
    >
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="问题" prop="question">
          <el-input v-model="editForm.question" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="回答" prop="answer">
          <el-input v-model="editForm.answer" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button size="mini" @click="ConfirmOperation()" type="success">确认操作</el-button>
          <el-button size="mini" type="primary" @click="cancleOperation()">取消操作</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      title: "",
      id: "",
      input: "",
      editFormVisible: false, //设置默认弹出框  为false

      editForm: {
        question: "",
        answer: "",
        reading: ""
      }
    };
  },

  watch: {
    input: function(str) {
      if (typeof str === "string") {
        if (str.trim().length !== 0) {
          this.debounce(this.searchData(), 1000);
        } else {
        }
      }
    }
  },

  mounted() {
    this.getData();
  },
  methods: {
    debounce(fn, wait) {
      var timeout = null;
      return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
      };
    },

    searchData() {
      this.$http({
        method: "post",
        url: "https://www.alingyi.com:23666/QAList",
        data: {
          content: this.input,
          university: "fzu"
        }
      }).then(r => {
        console.log(r.data.data);
        this.tableData = r.data.data;
        if (r.data.code === 200) {
          this.$message({
            type: "success",
            message: "搜索成功!"
          });
        }
      });
    },
    //新增
    newEdit() {
      this.editFormVisible = true;
      this.editForm = {};
      this.id = "";
      this.title = "新增";
    },
    cancleOperation() {
      this.editFormVisible = false;
    },
    ConfirmOperation() {
      if (this.title === "新增") {
        this.$http({
          method: "post",
          url: "https://www.alingyi.com:23666/QAList/insert",
          data: {
            question: this.editForm.question,
            answer: this.editForm.answer,
            university: "fzu"
          }
        }).then(r => {
          this.getData();
          this.editFormVisible = false;
          if (r.data.code === 200) {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
          }
        });
      } else {
        this.editData();
      }
    },
    //编辑
    handleEdit(id, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.id = id;
      this.title = "编辑";
    },

    editData() {
      this.$http({
        method: "post",
        url: "https://www.alingyi.com:23666/QAList/update",
        data: {
          question: this.editForm.question,
          answer: this.editForm.answer,
          id: this.id,
          university: "fzu"
        }
      }).then(r => {
        this.getData();
        this.editFormVisible = false;
        if (r.data.code === 200) {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
        }
      });
    },

    //点击删除
    handleDelete(id, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "post",
            url: "https://www.alingyi.com:23666/QAList/remove",
            data: {
              id: id,
              university: "fzu"
            }
          }).then(r => {
            this.getData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    getData() {
      let self = this;
      this.$http({
        method: "post",
        url: "https://www.alingyi.com:23666/QAList",
        data: {
          content: "",
          university: "fzu"
        }
      }).then(r => {
        console.log(r.data.data);
        this.tableData = r.data.data;
      });
    }
  }
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
