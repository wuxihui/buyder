<template>
  <div class="serve-total">
    <div class="serve-code">
      <p>{{ $t("main.code") }}</p>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="type" :label="$t('serve.service')" width="400" align="center"></el-table-column>
        <el-table-column prop="cost" :label="$t('serve.cost')" width="400" align="center"></el-table-column>
        <el-table-column prop="instructions" :label="$t('serve.instructions')" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="serve-china">
      <span>{{ $t("details.China freight") }}:</span>
      <span>{{ $t("serve.Buyder does not charge Chinese") }}</span>
    </div>
    <div class="serve-freight">
      <p>
        <span>{{ $t("details.The international freight") }}</span>
      </p>
      <el-table
        :data="tableDataVal"
        :span-method="objectSpanMethods"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column fixed="left" :label="$t('serve.channel_line')" width="280" align="center">
          <template slot-scope="scope">
            <div class="serve-dropdown">
              <span>
                {{ scope.row.type
                }}
                <el-popover placement="top" width="300" trigger="hover">
                  <p>{{ scope.row.aging }}</p>
                  <p>{{ scope.row.sun }}</p>
                  <p>{{ scope.row.reliable }}</p>
                  <p>{{ scope.row.own }}</p>
                  <img src="@/img/code-buy.png" alt slot="reference" />
                </el-popover>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('serve.warehouse')" align="center" width="140"></el-table-column>
        <el-table-column prop="cost" :label="$t('serve.cost')" align="center" width="140"></el-table-column>
        <el-table-column
          prop="instructions"
          :label="$t('serve.instructions')"
          align="center"
          width="638"
        ></el-table-column>
      </el-table>
    </div>

    <div class="server-home">
      <p>{{ $t("serve.Home delivery freight") }}</p>
      <el-table :data="tableHomeServe" border :span-method="objectSpanMethod" style="width: 100%">
        <el-table-column prop="name" :label="$t('serve.channel_line')" width="400" align="center"></el-table-column>
        <el-table-column prop="cost" :label="$t('serve.cost')" width="400" align="center"></el-table-column>
        <el-table-column
          prop="instructions"
          :label="$t('serve.instructions')"
          align="center"
          width="398"
        ></el-table-column>
      </el-table>
    </div>
    <div class="serve-addvalue">
      <p>{{ $t("serve.Value-added services") }}</p>
      <el-table :data="tableValueList" border style="width: 100%">
        <el-table-column prop="type" :label="$t('outside.type')" width="400" align="center"></el-table-column>
        <el-table-column prop="cost" :label="$t('serve.cost')" width="400" align="center"></el-table-column>
        <el-table-column
          prop="instructions"
          :label="$t('serve.instructions')"
          align="center"
          width="300"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style>
.serve-total .el-table .cell {
  white-space: pre-line !important;
}
</style>
<script>
import { symbol } from "@/entry/index";
export default {
  data() {
    return {
      spanArr: [],
      position: 0,
      isOk: false,
      loading: true,
      tableDataVal: [
        {
          type: this.$t("details.Tariff subsidy channel"),
          name: this.$t("serve.Hanoi_warehouse"),
          cost: "25000" + symbol + "/kg",
          instructions: this.$t("serve.calculated"),
          aging: this.$t("serve.aging"),
          sun: this.$t("serve.sun"),
          reliable: this.$t("serve.reliable"),
          own: this.$t("serve.own")
        },
        {
          type: this.$t("details.Tariff subsidy channel"),
          name: this.$t("serve.min_warehouse"),
          cost: "40000" + symbol + "/kg",
          instructions: this.$t("serve.calculated"),
          aging: this.$t("serve.aging"),
          sun: this.$t("serve.sun"),
          reliable: this.$t("serve.reliable"),
          own: this.$t("serve.own")
        },
        {
          type: this.$t("details.Traditional channels"),
          name: this.$t("serve.Hanoi_warehouse"),
          cost: "20000" + symbol + "/kg",
          instructions: this.$t("serve.calculated"),
          aging: this.$t("serve.nalService"),
          sun: this.$t("serve.priceLow")
        },
        {
          type: this.$t("details.Traditional channels"),
          name: this.$t("serve.min_warehouse"),
          cost: "25000" + symbol + "/kg",
          instructions: this.$t("serve.calculated"),
          aging: this.$t("serve.nalService"),
          sun: this.$t("serve.priceLow")
        }
      ],
      tableData: [
        {
          type: this.$t("details.Buying commission"),
          cost: "20000" + symbol + "/" + this.$t("serve.parcel"),
          instructions: ""
        }
      ],
      tableHomeServe: [
        {
          name: this.$t("details.Tariff subsidy channel"),
          cost: "19000" + symbol + "/0.5kg",
          instructions: this.$t("serve.isCalculatedAs")
        },
        {
          name: this.$t("details.Traditional channels"),
          cost: "19000" + symbol + "/0.5kg",
          instructions: this.$t("serve.isCalculatedAs")
        }
      ],
      tableValueList: [
        {
          type: this.$t("serve.take_photos"),
          cost: "10000" + symbol + "/" + this.$t("serve.parcel"),
          instructions: ""
        },
        {
          type: this.$t("serve.receipts"),
          cost: "3300" + symbol + "/" + this.$t("serve.parcel"),
          instructions: ""
        },
        {
          type: this.$t("serve.strengthening"),
          cost: "30000" + symbol + "/" + this.$t("serve.parcel"),
          instructions: this.$t("serve.exceeds")
        }
      ]
    };
  },
  methods: {
    //tableHomeServe
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].cost === data[i - 1].cost) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = i;
          }
        }
      }
    },
    //tableHomeServe 合并第二列第三列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 2) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    //合并第一列
    objectSpanMethods({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  },
  created() {
    this.getSpanArr(this.tableHomeServe);
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.serve-total {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  padding-bottom: 60px;
  /**控制表头和侧边栏颜色*/
  /deep/.el-table th > .cell {
    color: @home-logo;
  }
  .serve-code {
    p {
      font-family: Arial;
    }
    /deep/.el-table_1_column_1,
    .is-center {
      font-weight: 900;
    }
  }
  .serve-freight {
    p {
      font-family: Arial;
    }
    /deep/.serve-dropdown {
      font-weight: 900;
    }
  }
  .server-home {
    p {
      font-family: Arial;
    }
    /deep/.el-table_3_column_8,
    .is-center {
      font-weight: 900;
    }
  }
  .serve-addvalue {
    p {
      font-family: Arial;
    }
    /deep/.el-table_4_column_11,
    .is-center {
      font-weight: 900;
    }
  }
  //drop下拉框样式样式
  .serve-dropdown {
    img {
      width: 20px;
      height: 20px;
      position: relative;
      top: 5px;
      left: 5px;
    }
  }
  p {
    height: 16px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 34px;
    margin-bottom: 30px;
  }
  //中国运费
  .serve-china {
    margin: 10px 0;
    span {
      color: gray;
      font-size: 14px;
    }
    span:nth-child(1) {
      margin-right: 10px;
    }
  }
  .serve-freight {
    overflow: hidden;

    p {
      margin-top: 20px;
    }
  }

  .server-home {
    p {
      margin-top: 20px;
    }
  }

  .serve-addvalue {
    overflow: hidden;

    p {
      margin-top: 20px;
    }
  }
}
</style>
