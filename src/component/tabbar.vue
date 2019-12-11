<template>
  <div class="home-nav">
    <div class="home-rate">
      <img src="@/img/money.png" class="home-money" />
      <span>{{ $t("tabbar.The exchange rate") }}:</span>
      <span>{{ rate }}</span>
    </div>
    <div class="tabbar-list">
      <ul>
        <li v-for="tab in tabs" :key="tab.id">
          <router-link :to="tab.href" tag="div" active-class="z-act">{{
            tab.name
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "@/md5/jQuery.md5";
import { ak, sk, CountryCode } from "@/entry/index";
import { setItems, getItems } from "@/unilts/auth";
import { mapState, mapActions } from "vuex";
export default {
  name: "tabbar",
  props: {
    tabs: Array
  },
  computed: {
    ...mapState("car", ["rate"])
  },
  methods: {
    ...mapActions("car", ["getRate"])
  },
  created() {
    this.getRate();
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.home-nav {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  .home-rate {
    margin-top: 17px;
    min-width: 130px;

    .home-money {
      height: 14px;
      width: 14px;
    }
  }
  .tabbar-list {
    margin-left: 110px;
    ul {
      display: flex;
      margin-top: 5px;
      .z-act {
        color: @home-logo;
        border-bottom: 2px solid @home-logo;
      }
      li {
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        margin-right: 40px;
        min-height: 38px;
        line-height: 38px;
      }
      li:hover {
        color: @home-logo;
      }
    }
  }
}
</style>
