<template>
  <div class="nav-total">
    <h1>{{$t("main.Notice")}}</h1>
    <div class="nav-content">
      <!-- 左边菜单栏 -->
      <div class="nav-tutorial">
        <ul>
          <li
            v-for="(list, index) in noticeList"
            :key="list._Id"
            :style="{'color': isColor === index ? '#d33319' : ''}"
            @click="handleColor(index)"
          >{{list._Title}}</li>
        </ul>
      </div>

      <div v-html="Content == ''? FirstContent : Content " style="margin-left:100px;">
    
      </div>
    </div>
  </div>
</template>



<script>
import { CountryCode} from "@/entry/index";
import { mapActions, mapState } from "vuex";
export default {
  name: "noticeMain",
  data() {
    return {
      isColor: 0,
      isIndex: 0,
      Content:"",      
    };
  },
  computed: {
    ...mapState("notice", ["noticeList","FirstContent"])
  },
  methods: {
    ...mapActions("notice", ["GetNoticeList"]),
    //改变颜色
    handleColor(index) {
      this.isColor = index;
      this.isIndex = index;
      this.Content = this.noticeList[index]._Content;
    }
  },
  created() {
    let params = {
      CountryCode: CountryCode
    };
    this.GetNoticeList(params);
  }
};
</script>

<style scoped lang="less">
@import '~@/styles/common/variable.less';
.nav-total {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 60px;
  h1 {
    font-weight: 900;
    margin-top: 30px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    width: 150px;
    border-left: 8px solid @home-logo;
  }
  .nav-content {
    
      display: flex;
      //菜单栏
    .nav-tutorial {
      margin: 8px 0 0 40px;
      li {
        cursor: pointer;
        // font-weight: 900;
        font-size: 14px;
        min-width: 170px;
        height: 35px;
        line-height: 35px;
      }
      li:hover {
          color: @home-logo;
      }
    }
  }
}
</style>