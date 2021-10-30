<template>
  <div class="mainData">
    <el-container>
      <el-header style="text-align: left; font-size: 20px;background-color: rgb(250, 250, 250)">
        <el-input v-model="input" placeholder="请输入搜素内容" style="width:500px; margin-right:700px"></el-input>
        <el-button type="primary" @click="newEdit()">新增未覆盖提问</el-button>
      </el-header>
      <el-main style="background-color: rgb(240, 242, 245)">
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border-
          style="width: 1250;background-color: rgb(250, 250, 250)"
        >
          <el-table-column prop="question" label="问题" min-width="400" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="answer" label="答案" min-width="500" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="reading" label="阅读量" min-width="200"></el-table-column>
          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="tabListPage">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page-="currentPage"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.totalCount"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
    <v-dialog ref="mychild" @return="get"></v-dialog>
  </div>
</template>
<script>
import vDialog from "./formDialog";
import { removeBackgroundData, getBackgroundData } from "../util/api";
export default {
  props: ["value"],
  data() {
    return {
      tableData: [],
      id: "",
      input: "",
      currentPage: 1,
      totalCount: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40]
    };
  },

  components: {
    vDialog
  },

  watch: {
    input(str) {
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
    get(tableData, totalCount) {
      this.tableData = tableData;
      this.totalCount = totalCount;
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    debounce(fn, wait) {
      var timeout = null;
      return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
      };
    },

    searchData() {
      let data = {
        content: this.input,
        university: "fzu"
      };
      getBackgroundData(data).then(r => {
        console.log(r.data);
        this.tableData = r.data;
        if (r.code === 200) {
          this.$message({
            type: "success",
            message: "搜索成功!"
          });
        }
      });
    },
    //新增
    newEdit() {
      this.$refs.mychild.newEdit();
    },

    //编辑
    handleEdit(id, row) {
      this.$refs.mychild.handleEdit(id, row);
    },

    //点击删除
    handleDelete(id, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            id: id,
            university: "fzu"
          };
          removeBackgroundData(data).then(r => {
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
      let data = {
        content: "",
        university: "fzu"
      };
      getBackgroundData(data).then(r => {
        console.log(r.data);
        this.tableData = r.data;
        this.totalCount = r.data.length;
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
  width: 100%;
}
</style>
