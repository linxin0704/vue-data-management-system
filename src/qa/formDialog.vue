<template>
  <div>
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
import {
  editBackgroundData,
  addBackgroundData,
  getBackgroundData
} from "../util/api";
export default {
  data() {
    return {
      tableData: [],
      totalCount: 1,
      editFormVisible: false, //设置默认弹出框  为false
      title: "",
      id: "",
      editForm: {
        question: "",
        answer: "",
        reading: ""
      }
    };
  },
  methods: {
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
        let data = {
          question: this.editForm.question,
          answer: this.editForm.answer,
          university: "fzu"
        };
        addBackgroundData(data).then(r => {
          this.getData();
          this.editFormVisible = false;
          if (r.code === 200) {
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
      let data = {
        question: this.editForm.question,
        answer: this.editForm.answer,
        id: this.id,
        university: "fzu"
      };
      editBackgroundData(data).then(r => {
        this.getData();
        this.editFormVisible = false;
        if (r.code === 200) {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
        }
      });
    },
    getData() {
      let data = {
        content: "",
        university: "fzu"
      };
      getBackgroundData(data).then(r => {
        console.log(r.data.data);
        this.tableData = r.data;
        this.totalCount = r.data.length;
        this.$emit("return", this.tableData, this.totalCount);
      });
    }
  }
};
</script>