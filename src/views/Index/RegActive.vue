<template>
  <div class="registered-total">
    <img src="@/img/happy.jpg" v-if="regActions === true" />
    <img src="@/img/sad.jpg" v-if="regActions === false" />
    <h1>
      <span v-if="regActions === true">{{$t("registered.Registration activation successful")}}</span>
      <span v-if="regActions === false">{{$t("registered.registration activation failed")}}</span>
      <button @click="handleGo" v-if="regActions === true">
        {{$t("headerTop.login")}}
        <i class="el-icon-right"></i>
      </button>
    </h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "regactives",
  data() {
    return {
      regActions: ""
    };
  },
  computed: {
    ...mapState("header", ["IsOrShow"]),
    ...mapState("regActive", ["IsOrShow"])
  },
  methods: {
    ...mapActions("regActive", ["actions"]),
    handleGo() {
      let isOk = true;
      this.$store.commit("header/SETISTANKUANG", isOk);
    }
  },
  created() {
    let params = {
      UserCode: this.$route.query.UserCode,
      Key: this.$route.query.key
    };
    this.$api
      .regActions(params)
      .then(res => {
        if (res.Data) {
          let resNew = res.Data;
          this.regActions = resNew;
        } else {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
        }
      })
      .catch(err => {
        this.regActions = false;
      });
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.registered-total {
  margin: 0 auto;
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  h1 {
    span:nth-child(1) {
      font-size: 40px;
      color: green;
    }
    span:nth-child(2) {
      font-size: 40px;
      color: @home-logo;
    }
    button {
      height: 40px;
      //min-width: 80px;
      border: none;
      position: relative;
      top: -8px;
      left: 20px;
      background: @home-logo;
      color: @fff;
      font-size: 16px;
      font-weight: 900;
      border-radius: 5px;
      text-align: center;
      outline: none;
    }
  }
  img {
    height: 400px;
    width: 400px;
  }
}
</style>